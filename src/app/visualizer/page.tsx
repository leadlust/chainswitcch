"use client";
import { ForceGraph2D } from "react-force-graph";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Separate types into their own file
interface Node {
  id: string;
  val: number;
  x?: number;
  y?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  val: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

// Constants
const GRAPH_CONFIG = {
  NODE_SIZE: 6,
  CENTER_NODE_VALUE: 4,
  NORMAL_NODE_VALUE: 2,
  ZOOM_LEVEL: 4,
  ZOOM_DURATION: 1000,
  SENDING_X_OFFSET: 7,
  RECEIVING_X_OFFSET: -7,
  FONT_SIZE: 12,
  NODE_RADIUS: 10,
  LINK_WIDTH: 0.5,
} as const;

const COLORS = {
  SENDING: "rgba(255, 0, 0, 0.8)",
  RECEIVING: "rgba(0, 255, 0, 0.8)",
  DEFAULT: "rgba(204, 204, 204, 0.5)",
  NODE_FILL: "rgba(211,211,211, 0.3)",
  NODE_TEXT: "white",
  NODE_HIGHLIGHT: "rgba(176, 38, 255, 0.8)",
  BACKGROUND: "black",
} as const;

const Page = () => {
  const [centerNode, setCenterNode] = useState<Node | null>(null);
  const [previousCenterNode, setPreviousCenterNode] = useState<Node | null>(
    null
  );
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1000,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const router = useRouter();
  const fgRef = useRef<ForceGraph2D | null>(null);
  const searchParams = useSearchParams();

  // Memoized initial data
  const initialGraphData: GraphData = useMemo(
    () => ({
      nodes: [
        { id: "0x1234...5678", val: GRAPH_CONFIG.NORMAL_NODE_VALUE },
        { id: "0x8765...4321", val: GRAPH_CONFIG.NORMAL_NODE_VALUE },
        { id: "0x2468...1357", val: GRAPH_CONFIG.NORMAL_NODE_VALUE },
        { id: "0x9ABC...DEF0", val: GRAPH_CONFIG.NORMAL_NODE_VALUE },
      ],
      links: [
        { source: "0x1234...5678", target: "0x8765...4321", val: 1.2 },
        { source: "0x8765...4321", target: "0x2468...1357", val: 0.5 },
        { source: "0x1234...5678", target: "0x9ABC...DEF0", val: 0.8 },
      ],
    }),
    []
  );

  // Helper functions
  const getNodeId = useCallback((node: string | Node): string => {
    return typeof node === "object" && "id" in node ? node.id : node;
  }, []);
  // Helper function to link color based on direcions
  const getLinkColor = useCallback(
    (link: Link): string => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);

      if (sourceId === centerNode?.id) return COLORS.SENDING;
      if (targetId === centerNode?.id) return COLORS.RECEIVING;
      return COLORS.DEFAULT;
    },
    [centerNode, getNodeId]
  );
  // Helper function to calculate intersection point of line and circle
  const getIntersectionPoint = useCallback(
    (
      x1: number,
      y1: number, // Line start point
      x2: number,
      y2: number, // Line end point
      cx: number,
      cy: number, // Circle center
      r: number // Circle radius
    ): [number, number] => {
      // Calculate direction vector
      const dx = x2 - x1;
      const dy = y2 - y1;

      // Calculate the length of the direction vector
      const length = Math.sqrt(dx * dx + dy * dy);

      // Normalize the direction vector
      const unitX = dx / length;
      const unitY = dy / length;

      // Calculate intersection point
      const intersectX = cx + unitX * r;
      const intersectY = cy + unitY * r;

      return [intersectX, intersectY];
    },
    []
  );

  // Helper function to find bidirectional links
  // const findBidirectionalLink = useCallback(
  //   (sourceId: string, targetId: string, links: Link[]): Link | undefined => {
  //     return links.find(
  //       (l) =>
  //         getNodeId(l.source) === targetId && getNodeId(l.target) === sourceId
  //     );
  //   },
  //   [getNodeId]
  // );

  // Optimized filter logic
  const graphData: GraphData = useMemo(() => {
    if (!centerNode) return initialGraphData;

    const linkedNodeIds = new Set<string>([centerNode.id]);
    const sendingNodes = new Set<string>();
    const receivingNodes = new Set<string>();

    initialGraphData.links.forEach((link) => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);

      if (sourceId === centerNode.id) {
        linkedNodeIds.add(targetId);
        sendingNodes.add(targetId);
      }
      if (targetId === centerNode.id) {
        linkedNodeIds.add(sourceId);
        receivingNodes.add(sourceId);
      }
    });

    return {
      nodes: initialGraphData.nodes
        .filter((node) => linkedNodeIds.has(node.id))
        .map((node) => ({
          ...node,
          x:
            node.id === centerNode.id
              ? 0
              : sendingNodes.has(node.id)
              ? GRAPH_CONFIG.SENDING_X_OFFSET
              : receivingNodes.has(node.id)
              ? GRAPH_CONFIG.RECEIVING_X_OFFSET
              : 0,
          y: 0,
        })),
      links: initialGraphData.links.filter((link) => {
        const sourceId = getNodeId(link.source);
        const targetId = getNodeId(link.target);
        return (
          linkedNodeIds.has(sourceId) &&
          linkedNodeIds.has(targetId) &&
          (sourceId === centerNode.id || targetId === centerNode.id)
        );
      }),
    };
  }, [centerNode, initialGraphData, getNodeId]);

  // Event handlers
  const handleNodeClick = useCallback(
    (node: Node) => {
      setCenterNode(node);
      router.push(`/visualizer?address=${node.id}`);
    },
    [router]
  );
  // Canvas rendering functions
  const nodeCanvasObject = useCallback(
    (node: Node, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const fontSize = GRAPH_CONFIG.FONT_SIZE / globalScale;
      const address = searchParams.get("address");
      const x = node.x || 0;
      const y = node.y || 0;

      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, GRAPH_CONFIG.NODE_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = COLORS.NODE_FILL;
      ctx.fill();

      // Draw highlight if needed
      if (node.id === address) {
        ctx.strokeStyle = COLORS.NODE_HIGHLIGHT;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw label
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = COLORS.NODE_TEXT;
      ctx.fillText(node.id, x, y);
    },
    [searchParams]
  );
  const linkCanvasObject = useCallback(
    (link: Link, ctx: CanvasRenderingContext2D) => {
      const sourceNode = graphData.nodes.find(
        (node) => node.id === getNodeId(link.source)
      );
      const targetNode = graphData.nodes.find(
        (node) => node.id === getNodeId(link.target)
      );

      if (!sourceNode || !targetNode) return;

      const x1 = sourceNode.x || 0;
      const y1 = sourceNode.y || 0;
      const x2 = targetNode.x || 0;
      const y2 = targetNode.y || 0;

      // Calculate intersection points with both node circles
      const [startX, startY] = getIntersectionPoint(
        x1,
        y1, // Start from source center
        x2,
        y2, // To target
        x1,
        y1, // Source circle center
        GRAPH_CONFIG.NODE_RADIUS
      );

      const [endX, endY] = getIntersectionPoint(
        x2,
        y2, // Start from target center
        x1,
        y1, // To source
        x2,
        y2, // Target circle center
        GRAPH_CONFIG.NODE_RADIUS
      );

      // Draw link
      ctx.beginPath();
      ctx.strokeStyle = getLinkColor(link);
      ctx.lineWidth = GRAPH_CONFIG.LINK_WIDTH;
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      // ---- Draw arrow head at the target end ----

      // Define arrow dimensions (adjust these values as needed)
      const arrowLength = 4; // Length of the arrow head
      const arrowAngleOffset = Math.PI / 7; // Angular offset for arrow head sides

      // Calculate the angle of the link line
      const angle = Math.atan2(endY - startY, endX - startX);

      // Compute the two base points for the arrow head triangle
      const arrowPoint1X =
        endX - arrowLength * Math.cos(angle - arrowAngleOffset);
      const arrowPoint1Y =
        endY - arrowLength * Math.sin(angle - arrowAngleOffset);
      const arrowPoint2X =
        endX - arrowLength * Math.cos(angle + arrowAngleOffset);
      const arrowPoint2Y =
        endY - arrowLength * Math.sin(angle + arrowAngleOffset);

      // Draw the arrow head triangle
      ctx.beginPath();
      ctx.moveTo(endX, endY); // tip of the arrow (touching the target node)
      ctx.lineTo(arrowPoint1X, arrowPoint1Y);
      ctx.lineTo(arrowPoint2X, arrowPoint2Y);
      ctx.closePath();
      ctx.fillStyle = getLinkColor(link); // Use the same color as the link
      ctx.fill();

      //   Draw link value text
      //   if (hoveredLink === link) {
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      ctx.fillStyle = COLORS.NODE_TEXT;
      ctx.font = "4px Sans-Serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const valueText = `${link.val}`;
      const textMetrics = ctx.measureText(valueText);
      const padding = 1;
      const textHeight = 4;
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(
        midX - textMetrics.width / 2 - padding,
        midY - textHeight / 2 - padding,
        textMetrics.width + padding * 2,
        textHeight + padding * 2
      );
      // Draw the link value text
      ctx.fillStyle = "white";
      ctx.fillText(`${link.val}`, midX, midY);
    },
    [getLinkColor, graphData, getNodeId, getIntersectionPoint]
  );

  // Modified linkCanvasObject to automatically detect and render bidirectional links
  //  const linkCanvasObject = useCallback(
  //     (link: Link, ctx: CanvasRenderingContext2D) => {
  //       const sourceNode = graphData.nodes.find(
  //         (node) => node.id === getNodeId(link.source)
  //       );
  //       const targetNode = graphData.nodes.find(
  //         (node) => node.id === getNodeId(link.target)
  //       );

  //       if (!sourceNode || !targetNode) return;

  //       const x1 = sourceNode.x || 0;
  //       const y1 = sourceNode.y || 0;
  //       const x2 = targetNode.x || 0;
  //       const y2 = targetNode.y || 0;

  //       // Check if there's a reverse link
  //       const reverseLink = findBidirectionalLink(
  //         getNodeId(link.source),
  //         getNodeId(link.target),
  //         graphData.links
  //       );

  //       if (reverseLink) {
  //         // Draw curved lines for bidirectional links
  //         const dx = x2 - x1;
  //         const dy = y2 - y1;
  //         const angle = Math.atan2(dy, dx);

  //         // Calculate control points for both curves
  //         const offsetX = Math.sin(angle) * GRAPH_CONFIG.CURVE_OFFSET;
  //         const offsetY = -Math.cos(angle) * GRAPH_CONFIG.CURVE_OFFSET;

  //         // Draw first direction (source to target)
  //         ctx.beginPath();
  //         ctx.strokeStyle = getLinkColor(link);
  //         ctx.lineWidth = GRAPH_CONFIG.LINK_WIDTH;
  //         ctx.moveTo(x1, y1);
  //         ctx.quadraticCurveTo(
  //           (x1 + x2) / 2 + offsetX,
  //           (y1 + y2) / 2 + offsetY,
  //           x2,
  //           y2
  //         );
  //         ctx.stroke();

  //         // Draw arrow for first direction
  //         drawArrowhead(
  //           ctx,
  //           (x1 + x2) / 2 + offsetX,
  //           (y1 + y2) / 2 + offsetY,
  //           x2,
  //           y2,
  //           getLinkColor(link)
  //         );

  //         // Draw second direction (target to source)
  //         ctx.beginPath();
  //         ctx.strokeStyle = getLinkColor(reverseLink);
  //         ctx.lineWidth = GRAPH_CONFIG.LINK_WIDTH;
  //         ctx.moveTo(x2, y2);
  //         ctx.quadraticCurveTo(
  //           (x1 + x2) / 2 - offsetX,
  //           (y1 + y2) / 2 - offsetY,
  //           x1,
  //           y1
  //         );
  //         ctx.stroke();

  //         // Draw arrow for second direction
  //         drawArrowhead(
  //           ctx,
  //           (x1 + x2) / 2 - offsetX,
  //           (y1 + y2) / 2 - offsetY,
  //           x1,
  //           y1,
  //           getLinkColor(reverseLink)
  //         );

  //         // Draw values for both directions
  //         const midPoint1 = {
  //           x: (x1 + x2) / 2 + offsetX * 0.8,
  //           y: (y1 + y2) / 2 + offsetY * 0.8,
  //         };
  //         const midPoint2 = {
  //           x: (x1 + x2) / 2 - offsetX * 0.8,
  //           y: (y1 + y2) / 2 - offsetY * 0.8,
  //         };

  //         // Draw first value
  //         ctx.fillStyle = COLORS.NODE_TEXT;
  //         ctx.font = "4px Sans-Serif";
  //         ctx.textAlign = "center";
  //         ctx.textBaseline = "middle";
  //         ctx.fillText(`${link.val}`, midPoint1.x, midPoint1.y);

  //         // Draw second value
  //         ctx.fillText(`${reverseLink.val}`, midPoint2.x, midPoint2.y);
  //       } else {
  //         // Original single direction link drawing logic
  //         const [startX, startY] = getIntersectionPoint(
  //           x1,
  //           y1,
  //           x2,
  //           y2,
  //           x1,
  //           y1,
  //           GRAPH_CONFIG.NODE_RADIUS
  //         );
  //         const [endX, endY] = getIntersectionPoint(
  //           x2,
  //           y2,
  //           x1,
  //           y1,
  //           x2,
  //           y2,
  //           GRAPH_CONFIG.NODE_RADIUS
  //         );

  //         ctx.beginPath();
  //         ctx.strokeStyle = getLinkColor(link);
  //         ctx.lineWidth = GRAPH_CONFIG.LINK_WIDTH;
  //         ctx.moveTo(startX, startY);
  //         ctx.lineTo(endX, endY);
  //         ctx.stroke();

  //         // Draw arrow
  //         drawArrowhead(
  //           ctx,
  //           startX,
  //           startY,
  //           endX,
  //           endY,
  //           getLinkColor(link)
  //         );

  //         // Draw value
  //         const midX = (startX + endX) / 2;
  //         const midY = (startY + endY) / 2;

  //         ctx.fillStyle = COLORS.NODE_TEXT;
  //         ctx.font = "4px Sans-Serif";
  //         ctx.textAlign = "center";
  //         ctx.textBaseline = "middle";
  //         ctx.fillText(`${link.val}`, midX, midY);
  //       }
  //     },
  //     [getLinkColor, graphData, getNodeId, getIntersectionPoint, findBidirectionalLink]
  //   );
  // Helper function to draw arrowheads
  // const drawArrowhead = useCallback(
  //   (
  //     ctx: CanvasRenderingContext2D,
  //     fromX: number,
  //     fromY: number,
  //     toX: number,
  //     toY: number,
  //     color: string
  //   ) => {
  //     const arrowLength = 4;
  //     const arrowAngleOffset = Math.PI / 7;

  //     const angle = Math.atan2(toY - fromY, toX - fromX);

  //     const arrowPoint1X =
  //       toX - arrowLength * Math.cos(angle - arrowAngleOffset);
  //     const arrowPoint1Y =
  //       toY - arrowLength * Math.sin(angle - arrowAngleOffset);
  //     const arrowPoint2X =
  //       toX - arrowLength * Math.cos(angle + arrowAngleOffset);
  //     const arrowPoint2Y =
  //       toY - arrowLength * Math.sin(angle + arrowAngleOffset);

  //     ctx.beginPath();
  //     ctx.moveTo(toX, toY);
  //     ctx.lineTo(arrowPoint1X, arrowPoint1Y);
  //     ctx.lineTo(arrowPoint2X, arrowPoint2Y);
  //     ctx.closePath();
  //     ctx.fillStyle = color;
  //     ctx.fill();
  //   },
  //   []
  // );

  //Effects
  useEffect(() => {
    const address = searchParams.get("address");
    if (address) {
      const initialNode = initialGraphData.nodes.find(
        (node) => node.id === address
      );
      if (initialNode) {
        setCenterNode(initialNode);
      }
    }
  }, [searchParams, initialGraphData.nodes]);

  useEffect(() => {
    if (centerNode && fgRef.current && centerNode !== previousCenterNode) {
      fgRef.current.centerAt(0, 0, GRAPH_CONFIG.ZOOM_DURATION);
      fgRef.current.zoom(GRAPH_CONFIG.ZOOM_LEVEL, GRAPH_CONFIG.ZOOM_DURATION);
      setPreviousCenterNode(centerNode);
    }
  }, [centerNode, previousCenterNode]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1625]">
      <Navbar />
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeRelSize={GRAPH_CONFIG.NODE_SIZE}
        nodeVal={(node) =>
          node === centerNode
            ? GRAPH_CONFIG.CENTER_NODE_VALUE
            : GRAPH_CONFIG.NORMAL_NODE_VALUE
        }
        nodeLabel={(node) => node.id}
        onNodeClick={handleNodeClick}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor={COLORS.BACKGROUND}
        nodeCanvasObject={nodeCanvasObject}
        linkCanvasObject={linkCanvasObject}
      />
      <Footer />
    </div>
  );
};

export default Page;
