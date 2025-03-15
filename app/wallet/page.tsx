"use client";
import dynamic from "next/dynamic";
import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CustomLogo } from "@/components/custom-logo"
import Link from "next/link"; // Import Link component
import { Sun, Moon, Menu, X } from "lucide-react"; // Import icons

// dynamically importing forcegraph2d to prevent SSR issues
const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d'),
  { ssr: false }
);

//types
interface Node {
  id: string;
  val: number;
  isCenter?: boolean;
  x?: number;
  y?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  val: number;
  count?: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

//constants
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
  const [address, setAddress] = useState<string>("");
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: []
  });
  
  const [centerNode, setCenterNode] = useState<Node | null>(null);
  
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1000,
    height: typeof window !== "undefined" ? window.innerHeight - 200 : 600, // Account for header/search bar
  });

  const router = useRouter();
  const fgRef = useRef<any>(null);
  const searchParams = useSearchParams();
  const urlAddress = searchParams.get("address");

  //helper functions
  const getNodeId = useCallback((node: string | Node): string => {
    return typeof node === "object" && "id" in node ? node.id : node;
  }, []);
  
  //helper function for link color based on directions
  const getLinkColor = useCallback(
    (link: Link): string => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);

      if (centerNode) {
        if (sourceId === centerNode.id) return COLORS.SENDING;
        if (targetId === centerNode.id) return COLORS.RECEIVING;
      }
      return COLORS.DEFAULT;
    },
    [centerNode, getNodeId]
  );
  
  //helper function to calculate intersection point of line and circle
  const getIntersectionPoint = useCallback(
    (
      x1: number,
      y1: number, //line start point
      x2: number,
      y2: number, //line end point
      cx: number,
      cy: number, //circle center
      r: number //circle radius
    ): [number, number] => {
      //calculate direction vector
      const dx = x2 - x1;
      const dy = y2 - y1;

      //calculate the length of the direction vector
      const length = Math.sqrt(dx * dx + dy * dy);

      //normalize the direction vector
      const unitX = dx / length;
      const unitY = dy / length;

      //calculate intersection point
      const intersectX = cx + unitX * r;
      const intersectY = cy + unitY * r;

      return [intersectX, intersectY];
    },
    []
  );

  //fetch data from the api
  const fetchGraphData = useCallback(async (walletAddress: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log(`Fetching data for address: ${walletAddress}`);
      
      //using the correct API endpoint path
      const response = await fetch(`/visualizer?address=${walletAddress}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API returned status ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API returned data:", data);
      
      if (!data.nodes || !data.links || data.nodes.length === 0) {
        throw new Error("No transaction data found for this address");
      }
      
      //find the center node
      const center = data.nodes.find((node: Node) => node.isCenter);
      
      setGraphData(data);
      setCenterNode(center || null);
      
      //center the graph after data is loaded
      setTimeout(() => {
        if (fgRef.current) {
          fgRef.current.centerAt(0, 0, GRAPH_CONFIG.ZOOM_DURATION);
          fgRef.current.zoom(GRAPH_CONFIG.ZOOM_LEVEL, GRAPH_CONFIG.ZOOM_DURATION);
        }
      }, 100);
      
    } catch (err: any) {
      console.error("Error fetching graph data:", err);
      setError(err.message || "Failed to fetch transaction data");
      
      //set fallback empty data
      setGraphData({
        nodes: [],
        links: []
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  //initialize address from url and fetch data if available
  useEffect(() => {
    if (urlAddress) {
      setAddress(urlAddress);
      fetchGraphData(urlAddress);
    }
  }, [urlAddress, fetchGraphData]);

  //event handlers
  const handleNodeClick = useCallback(
    (node: Node) => {
      router.push(`/visualizer?address=${node.id}`);
      
      //store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("lastSearchedAddress", node.id);
      }
    },
    [router]
  );
  
  //form handling
  const isValidAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidAddress(address)) {
      setError("Please enter a valid Ethereum address");
      return;
    }

    setIsValidating(true);
    
    try {
      //store the address in localStorage for the Launch App button
      if (typeof window !== "undefined") {
        localStorage.setItem("lastSearchedAddress", address);
      }
      
      //navigate to the visualizer with the address
      router.push(`/visualizer?address=${address}`);
    } catch (err: any) {
      setError(err.message || "Failed to navigate");
    } finally {
      setIsValidating(false);
    }
  };
  
  //canvas rendering functions
  const nodeCanvasObject = useCallback(
    (node: Node, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const fontSize = GRAPH_CONFIG.FONT_SIZE / globalScale;
      const address = searchParams.get("address");
      const x = node.x || 0;
      const y = node.y || 0;

      //draw node
      ctx.beginPath();
      ctx.arc(x, y, GRAPH_CONFIG.NODE_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = COLORS.NODE_FILL;
      ctx.fill();

      //draw highlight if needed
      if (node.id === address || node.isCenter) {
        ctx.strokeStyle = COLORS.NODE_HIGHLIGHT;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      //draw label
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = COLORS.NODE_TEXT;
      
      //truncate the address for display
      const displayText = node.id.substring(0, 6) + "..." + node.id.substring(node.id.length - 4);
      ctx.fillText(displayText, x, y);
    },
    [searchParams]
  );
  
  const linkCanvasObject = useCallback(
    (link: Link, ctx: CanvasRenderingContext2D) => {
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);
      
      //find the actual node objects
      const sourceNode = graphData.nodes.find(node => node.id === sourceId);
      const targetNode = graphData.nodes.find(node => node.id === targetId);

      if (!sourceNode || !targetNode) return;

      const x1 = sourceNode.x || 0;
      const y1 = sourceNode.y || 0;
      const x2 = targetNode.x || 0;
      const y2 = targetNode.y || 0;

      //calculate intersection points with both node circles
      const [startX, startY] = getIntersectionPoint(
        x1,
        y1, //start from source center
        x2,
        y2, //to target
        x1,
        y1, //source circle center
        GRAPH_CONFIG.NODE_RADIUS
      );

      const [endX, endY] = getIntersectionPoint(
        x2,
        y2, //start from target center
        x1,
        y1, //to source
        x2,
        y2, //target circle center
        GRAPH_CONFIG.NODE_RADIUS
      );

      //draw link
      ctx.beginPath();
      ctx.strokeStyle = getLinkColor(link);
      ctx.lineWidth = GRAPH_CONFIG.LINK_WIDTH;
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      //draw arrow head at the target end
      const arrowLength = 4; //length of the arrow head
      const arrowAngleOffset = Math.PI / 7; //angular offset for arrow head sides

      //calculate the angle of the link line
      const angle = Math.atan2(endY - startY, endX - startX);

      //compute the two base points for the arrow head triangle
      const arrowPoint1X =
        endX - arrowLength * Math.cos(angle - arrowAngleOffset);
      const arrowPoint1Y =
        endY - arrowLength * Math.sin(angle - arrowAngleOffset);
      const arrowPoint2X =
        endX - arrowLength * Math.cos(angle + arrowAngleOffset);
      const arrowPoint2Y =
        endY - arrowLength * Math.sin(angle + arrowAngleOffset);

      //draw the arrow head triangle
      ctx.beginPath();
      ctx.moveTo(endX, endY); //tip of the arrow
      ctx.lineTo(arrowPoint1X, arrowPoint1Y);
      ctx.lineTo(arrowPoint2X, arrowPoint2Y);
      ctx.closePath();
      ctx.fillStyle = getLinkColor(link);
      ctx.fill();

      //draw link value text
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      ctx.fillStyle = COLORS.NODE_TEXT;
      ctx.font = "4px Sans-Serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const valueText = link.val.toFixed(4); //limit decimal places for ETH value
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
      
      //draw the link value text
      ctx.fillStyle = "white";
      ctx.fillText(valueText, midX, midY);
    },
    [getLinkColor, graphData.nodes, getNodeId, getIntersectionPoint]
  );

  //window resize handler
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 200, //account for header/search bar
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <div className="flex items-center gap-2 font-bold">
            <CustomLogo
              text="ChainSwitch"
              letter="C"
              bgColor="bg-gradient-to-br from-cyan-400 to-cyan-300 dark:from-red-400 to-red-300"
            />
          </div>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-white mb-6">
            Wallet Transaction Visualizer
          </h1>
          
          {/*search form */}
          <div className="mb-8">
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-md">
                ⚠️ {error}
              </div>
            )}
            
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter wallet address (0x...)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10 bg-black/20 border-gray-700 text-white placeholder:text-gray-400 h-12 w-full"
                />
              </div>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 h-12 px-6"
                disabled={isValidating || isLoading}
              >
                {isValidating || isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Visualize
                  </div>
                ) : (
                  "Visualize"
                )}
              </Button>
            </form>
          </div>
          
          {urlAddress ? (
            <div className="mb-4">
              <Card className="bg-gray-900/50 border-gray-800 text-white">
                <CardContent className="py-3 px-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Current Wallet</p>
                      <p className="font-mono text-sm break-all">{urlAddress}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-xs text-gray-300">Outgoing</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-xs text-gray-300">Incoming</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-gray-900/50 border-gray-800 text-white mb-4">
              <CardContent className="py-4 text-center">
                <p className="text-gray-400">
                  Enter a wallet address above to visualize its transaction network
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* graph container */}
          <div className="bg-black rounded-lg overflow-hidden" style={{ height: `${dimensions.height}px` }}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                <p className="text-white ml-4">Loading transaction data...</p>
              </div>
            ) : graphData.nodes.length > 0 ? (
              <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                nodeRelSize={GRAPH_CONFIG.NODE_SIZE}
                nodeVal={(node) => node.val || GRAPH_CONFIG.NORMAL_NODE_VALUE}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor={COLORS.BACKGROUND}
                cooldownTicks={100}
                d3AlphaDecay={0.02}
                d3VelocityDecay={0.3}
              />
            ) : urlAddress ? (
              <div className="flex items-center justify-center h-full text-white">
                <p>No transaction data found for this address.</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <p>Enter a wallet address to see transaction data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;