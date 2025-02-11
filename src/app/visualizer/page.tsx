"use client";
import { ForceGraph2D } from "react-force-graph";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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

const BlockchainVisualizer = () => {
  const [centerNode, setCenterNode] = useState<Node | null>(null);
  const [previousCenterNode, setPreviousCenterNode] = useState<Node | null>(null);
  const [hoveredLink, setHoveredLink] = useState<Link | null>(null);
  const [dimensions, setDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
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
        .filter(node => linkedNodeIds.has(node.id))
        .map(node => ({
          ...node,
          x: node.id === centerNode.id ? 0 : 
             sendingNodes.has(node.id) ? GRAPH_CONFIG.SENDING_X_OFFSET :
             receivingNodes.has(node.id) ? GRAPH_CONFIG.RECEIVING_X_OFFSET : 0,
          y: 0
        })),
      links: initialGraphData.links.filter(link => {
        const sourceId = getNodeId(link.source);
        const targetId = getNodeId(link.target);
        return linkedNodeIds.has(sourceId) && 
               linkedNodeIds.has(targetId) && 
               (sourceId === centerNode.id || targetId === centerNode.id);
      })
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

  const handleLinkHover = useCallback((link: Link | null) => {
    setHoveredLink(link);
  }, []);

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

  // Helper function to calculate intersection point of line and circle
  const getIntersectionPoint = useCallback((
    x1: number, y1: number,  // Line start point
    x2: number, y2: number,  // Line end point
    cx: number, cy: number,  // Circle center
    r: number               // Circle radius
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
    const intersectX = cx + (unitX * r);
    const intersectY = cy + (unitY * r);
    
    return [intersectX, intersectY];
  }, []);

  const linkCanvasObject = useCallback(
    (link: Link, ctx: CanvasRenderingContext2D) => {
      const sourceNode = graphData.nodes.find(node => node.id === getNodeId(link.source));
      const targetNode = graphData.nodes.find(node => node.id === getNodeId(link.target));
      
      if (!sourceNode || !targetNode) return;

      const x1 = sourceNode.x || 0;
      const y1 = sourceNode.y || 0;
      const x2 = targetNode.x || 0;
      const y2 = targetNode.y || 0;

      // Calculate intersection points with both node circles
      const [startX, startY] = getIntersectionPoint(
        x1, y1,  // Start from source center
        x2, y2,  // To target
        x1, y1,  // Source circle center
        GRAPH_CONFIG.NODE_RADIUS
      );

      const [endX, endY] = getIntersectionPoint(
        x2, y2,  // Start from target center
        x1, y1,  // To source
        x2, y2,  // Target circle center
        GRAPH_CONFIG.NODE_RADIUS
      );

      // Draw link
      ctx.beginPath();
      ctx.strokeStyle = getLinkColor(link);
      ctx.lineWidth = GRAPH_CONFIG.LINK_WIDTH;
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Draw hover value
      if (hoveredLink === link) {
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        
        ctx.fillStyle = COLORS.NODE_TEXT;
        ctx.font = "4px Sans-Serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${link.val}`, midX, midY);
      }
    },
    [getLinkColor, hoveredLink, graphData, getNodeId, getIntersectionPoint]
  );

  // Effects
  useEffect(() => {
    const address = searchParams.get("address");
    if (address) {
      const initialNode = initialGraphData.nodes.find((node) => node.id === address);
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
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={graphData}
      nodeRelSize={GRAPH_CONFIG.NODE_SIZE}
      nodeVal={(node) => (node === centerNode ? GRAPH_CONFIG.CENTER_NODE_VALUE : GRAPH_CONFIG.NORMAL_NODE_VALUE)}
      nodeLabel={(node) => node.id}
      onLinkHover={handleLinkHover}
      onNodeClick={handleNodeClick}
      width={dimensions.width}
      height={dimensions.height}
      backgroundColor={COLORS.BACKGROUND}
      nodeCanvasObject={nodeCanvasObject}
      linkCanvasObject={linkCanvasObject}
    />
  );
};

export default BlockchainVisualizer;