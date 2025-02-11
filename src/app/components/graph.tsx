// components/Graph/types.ts
export interface GraphNode {
    id: string;
    value: number;
    label?: string;
    group?: string;
  }
  
  export interface GraphLink {
    source: string;
    target: string;
    value: number;
  }
  
  export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
  }
  
  // components/Graph/Graph.tsx
  import { useCallback, useMemo } from 'react';
  import dynamic from 'next/dynamic';
  import { ForceGraphProps } from 'react-force-graph-2d';
  import { GraphData, GraphNode, GraphLink } from './types';
  
  // Dynamically import ForceGraph2D to avoid SSR issues
  const ForceGraph2D = dynamic(
    () => import('react-force-graph-2d').then(mod => mod.ForceGraph2D),
    { ssr: false }
  );
  
  interface GraphComponentProps {
    data: GraphData;
    width?: number;
    height?: number;
    onNodeClick?: (node: GraphNode) => void;
    onLinkClick?: (link: GraphLink) => void;
  }
  
  const Graph = ({
    data,
    width = 800,
    height = 600,
    onNodeClick,
    onLinkClick
  }: GraphComponentProps) => {
    // Memoize graph data to prevent unnecessary rerenders
    const graphData = useMemo(() => ({
      nodes: data.nodes.map(node => ({
        ...node,
        // Add any additional node properties here
      })),
      links: data.links.map(link => ({
        ...link,
        // Add any additional link properties here
      }))
    }), [data]);
  
    // Node click handler
    const handleNodeClick = useCallback((node: GraphNode) => {
      if (onNodeClick) {
        onNodeClick(node);
      }
    }, [onNodeClick]);
  
    // Link click handler
    const handleLinkClick = useCallback((link: GraphLink) => {
      if (onLinkClick) {
        onLinkClick(link);
      }
    }, [onLinkClick]);
  
    // Custom node painting function
    const paintNode = useCallback((node: GraphNode, ctx: CanvasRenderingContext2D) => {
      // Node appearance customization
      const nodeR = Math.sqrt(node.value) * 5;
      
      // Draw node circle
      ctx.beginPath();
      ctx.arc(0, 0, nodeR, 0, 2 * Math.PI);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 1.5;
      ctx.stroke();
  
      // Draw node label
      if (node.label) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px Sans-Serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, 0, 0);
      }
    }, []);
  
    const graphProps: Partial<ForceGraphProps> = {
      nodeLabel: (node: any) => node.label || node.id,
      nodeVal: (node: any) => node.value,
      nodeAutoColorBy: 'group',
      linkWidth: (link: any) => Math.sqrt(link.value),
      linkColor: () => '#94a3b8',
      nodeCanvasObject: paintNode,
      nodePointerAreaPaint: paintNode,
      onNodeClick: handleNodeClick,
      onLinkClick: handleLinkClick,
      width,
      height
    };
  
    return (
      <div className="relative">
        <ForceGraph2D
          graphData={graphData}
          {...graphProps}
        />
      </div>
    );
  };
  
  export default Graph;
  
  // components/Graph/index.ts
  export { default as Graph } from './Graph';
  export * from './types';