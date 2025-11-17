'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileSignature,
  Plus,
  Download,
  Send,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  Save,
  X,
} from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  client: string;
  value: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdDate: string;
  expiryDate: string;
}

const PROPOSAL_TEMPLATES = [
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'Full-stack web application development',
    sections: ['Executive Summary', 'Scope of Work', 'Timeline', 'Investment', 'Terms'],
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    description: 'iOS and Android application development',
    sections: ['Project Overview', 'Features', 'Development Phases', 'Pricing', 'Support'],
  },
  {
    id: 'consulting',
    name: 'Consulting Services',
    description: 'Technical consulting and advisory',
    sections: ['Background', 'Objectives', 'Approach', 'Deliverables', 'Fees'],
  },
  {
    id: 'design',
    name: 'UI/UX Design',
    description: 'User interface and experience design',
    sections: ['Design Brief', 'Process', 'Deliverables', 'Timeline', 'Investment'],
  },
];

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'E-Commerce Platform Development',
      client: 'Acme Corp',
      value: 45000,
      status: 'sent',
      createdDate: '2024-12-01',
      expiryDate: '2024-12-31',
    },
    {
      id: '2',
      title: 'Mobile App - iOS & Android',
      client: 'Tech Startup',
      value: 65000,
      status: 'accepted',
      createdDate: '2024-11-15',
      expiryDate: '2024-12-15',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('web-dev');

  const generateProposal = (template: typeof PROPOSAL_TEMPLATES[0]) => {
    const content = `
# ${template.name} Proposal

## Client: [Client Name]
## Date: ${new Date().toLocaleDateString()}

---

${template.sections.map((section, i) => `
### ${i + 1}. ${section}

[Content for ${section}]

${section === 'Investment' || section === 'Pricing' || section === 'Fees' ? `
**Total Investment:** $XX,XXX
- Phase 1: $XX,XXX
- Phase 2: $XX,XXX
- Phase 3: $XX,XXX
` : ''}

---
`).join('\n')}

## Next Steps

1. Review and approve this proposal
2. Sign the agreement
3. Initial payment (50% deposit)
4. Project kickoff meeting

**Valid Until:** ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}

---

Thank you for considering DevBrain for your project!
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Proposal_${template.name.replace(/\s+/g, '_')}_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
      sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      accepted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status as keyof typeof colors];
  };

  const totalValue = proposals.reduce((sum, p) => sum + p.value, 0);
  const acceptedValue = proposals.filter(p => p.status === 'accepted').reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Proposal Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create professional proposals from templates
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Proposal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
                <p className="text-3xl font-bold text-purple-600">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
                <p className="text-3xl font-bold text-green-600">${acceptedValue.toLocaleString()}</p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-3xl font-bold text-blue-600">
                  {proposals.filter(p => p.status === 'sent').length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-blue-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{proposals.length}</p>
              </div>
              <FileSignature className="w-12 h-12 text-gray-600/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Proposals List */}
      <Card>
        <CardHeader>
          <CardTitle>All Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="flex items-center justify-between p-5 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
                    <FileSignature className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">{proposal.title}</h4>
                      <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{proposal.client}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        ${proposal.value.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Expires: {proposal.expiryDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline">
                    <Send className="w-3 h-3 mr-1" />
                    Send
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Create New Proposal</CardTitle>
                <Button size="icon" variant="ghost" onClick={() => setShowCreateModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Select Template</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {PROPOSAL_TEMPLATES.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <FileSignature className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{template.name}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                              {template.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {template.sections.slice(0, 3).map((section, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {section}
                                </Badge>
                              ))}
                              {template.sections.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{template.sections.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name</label>
                    <Input placeholder="Acme Corporation" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Value</label>
                    <Input type="number" placeholder="50000" />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const template = PROPOSAL_TEMPLATES.find(t => t.id === selectedTemplate)!;
                      generateProposal(template);
                      setShowCreateModal(false);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Proposal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
