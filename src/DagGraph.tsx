import React, { useEffect, useState } from 'react';
import ReactFlow, { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

type GraphNode = {
  id: string;
  data: { name: string };
  position: { x: number; y: number };
};

type GraphEdge = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: any[];
  edges: any[];
};

const DagGraph: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    fetch('https://jubilant-space-trout-7pq79x795qqhppqx-3000.app.github.dev/api/v1/aaa/actions/blueprints/bar/graph')
      .then(res => res.json())
      .then((graph: GraphData) => {
        setNodes(
          graph.nodes.map((n: any) => ({
            id: n.id,
            data: { label: n.data?.name || n.id },
            position: { x: n.position?.x || 0, y: n.position?.y || 0 },
            type: 'default',
          }))
        );
        setEdges(
          graph.edges.map((e: any, idx: number) => ({
            id: `e${idx}`,
            source: e.source,
            target: e.target,
            type: 'default',
          }))
        );
      });
  }, []);

  return (
    <div style={{ width: '100vw', height: '90vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
};

export default DagGraph;