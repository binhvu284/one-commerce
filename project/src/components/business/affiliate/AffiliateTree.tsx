'use client';

import { useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AffiliateNode as AffiliateNodeUI } from './AffiliateNode';
import { AffiliateNode } from '@/lib/types/business';
import { mockAffiliateTree } from '@/lib/mock/business';

const nodeTypes = {
  affiliate: AffiliateNodeUI,
};

// Simple auto-layout for MVP quad-tree
const generateFlowElements = (data: AffiliateNode[]) => {
  const nodes: any[] = [];
  const edges: any[] = [];

  const LEVEL_HEIGHT = 400;
  const LEVEL_SPACING = [0, 2400, 600, 200, 100, 50]; // Spacing between brothers at each level

  const childrenMap = new Map<string | null, AffiliateNode[]>();
  data.forEach(node => {
    const parentId = node.parentId;
    if (!childrenMap.has(parentId)) childrenMap.set(parentId, []);
    childrenMap.get(parentId)!.push(node);
  });

  const positionNode = (nodeId: string | null, parentX: number = 0, currentLevel: number = 0) => {
    const children = childrenMap.get(nodeId) || [];
    const count = children.length;
    const spacing = LEVEL_SPACING[currentLevel + 1] || 100;

    children.forEach((child, index) => {
      // Center children around parentX
      const x = parentX + (index - (count - 1) / 2) * spacing;
      const y = currentLevel * LEVEL_HEIGHT;

      nodes.push({
        id: child.id,
        type: 'affiliate',
        position: { x, y },
        data: child,
      });

      if (nodeId) {
        edges.push({
          id: `e-${nodeId}-${child.id}`,
          source: nodeId,
          target: child.id,
          animated: true,
          style: { stroke: '#6366f1', strokeWidth: 2, opacity: 0.6 },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
        });
      }

      positionNode(child.id, x, currentLevel + 1);
    });
  };

  const root = data.find(n => n.parentId === null);
  if (root) {
    nodes.push({
      id: root.id,
      type: 'affiliate',
      position: { x: 0, y: 0 },
      data: root,
    });
    positionNode(root.id, 0, 1);
  }

  return { nodes, edges };
};

export function AffiliateTree() {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => generateFlowElements(mockAffiliateTree), []);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-[700px] w-full bg-[var(--bg-muted)]/10 border-2 border-[var(--border)] rounded-3xl overflow-hidden relative shadow-inner group">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[20, 20]}
        minZoom={0.1}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--border)" gap={20} size={1} />
        <Controls className="!bg-[var(--bg-surface)] !border-[var(--border)] !rounded-xl !shadow-token-lg" />
        <MiniMap 
          nodeColor="#6366f1" 
          maskColor="rgba(0,0,0,0.1)" 
          className="!bg-[var(--bg-surface)] !border-[var(--border)] !rounded-xl !bottom-4 !right-4"
        />
      </ReactFlow>
      
      {/* Overlay info */}
      <div className="absolute top-6 left-6 pointer-events-none space-y-2">
        <div className="px-4 py-2 bg-[var(--bg-surface)]/80 backdrop-blur-md rounded-2xl border border-[var(--border)] shadow-token-lg">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Visualization Engine</p>
          <h2 className="text-sm font-black text-[var(--text-primary)]">Infinite Organization Tree</h2>
        </div>
        <div className="px-4 py-2 bg-[var(--bg-surface)]/80 backdrop-blur-md rounded-2xl border border-[var(--border)] shadow-token-lg flex items-center gap-3">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-[var(--text-secondary)]">Active Member</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              <span className="text-[10px] font-bold text-[var(--text-secondary)]">Inactive</span>
           </div>
        </div>
      </div>
    </div>
  );
}
