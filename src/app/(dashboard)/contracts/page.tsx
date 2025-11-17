'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  Eye,
  Copy,
  CheckCircle2,
  FileSignature,
  Briefcase,
  Code,
  Palette,
  Globe,
  Shield,
  Search,
  Plus,
} from 'lucide-react';

interface ContractTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  color: string;
  sections: string[];
}

const CONTRACT_TEMPLATES: ContractTemplate[] = [
  {
    id: 'web-dev',
    name: 'Web Development Agreement',
    category: 'Development',
    description: 'Comprehensive contract for web development projects',
    icon: Code,
    color: 'from-blue-500 to-indigo-500',
    sections: [
      'Project Scope',
      'Timeline & Milestones',
      'Payment Terms',
      'Intellectual Property',
      'Confidentiality',
      'Warranty & Support',
      'Termination',
    ],
  },
  {
    id: 'mobile-dev',
    name: 'Mobile App Development',
    category: 'Development',
    description: 'Contract for iOS and Android app development',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    sections: [
      'App Specifications',
      'Development Phases',
      'Testing & QA',
      'App Store Submission',
      'Payment Schedule',
      'Maintenance & Updates',
      'Termination Clause',
    ],
  },
  {
    id: 'design',
    name: 'UI/UX Design Agreement',
    category: 'Design',
    description: 'Contract for design services and deliverables',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    sections: [
      'Design Scope',
      'Deliverables',
      'Revisions Policy',
      'Timeline',
      'Payment Terms',
      'Usage Rights',
      'Final Files',
    ],
  },
  {
    id: 'consulting',
    name: 'Tech Consulting Agreement',
    category: 'Consulting',
    description: 'Professional services and consulting contract',
    icon: Briefcase,
    color: 'from-orange-500 to-red-500',
    sections: [
      'Services Description',
      'Hourly Rate',
      'Retainer Terms',
      'Deliverables',
      'Confidentiality',
      'Non-Compete',
      'Termination',
    ],
  },
  {
    id: 'maintenance',
    name: 'Website Maintenance Agreement',
    category: 'Support',
    description: 'Ongoing maintenance and support contract',
    icon: Globe,
    color: 'from-green-500 to-emerald-500',
    sections: [
      'Maintenance Services',
      'Response Times',
      'Monthly Retainer',
      'Included Updates',
      'Emergency Support',
      'Renewal Terms',
      'Cancellation Policy',
    ],
  },
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement',
    category: 'Legal',
    description: 'Protect confidential information and trade secrets',
    icon: Shield,
    color: 'from-gray-500 to-slate-500',
    sections: [
      'Definition of Confidential Information',
      'Obligations',
      'Exceptions',
      'Term',
      'Return of Materials',
      'Remedies',
      'Governing Law',
    ],
  },
  {
    id: 'sow',
    name: 'Statement of Work (SOW)',
    category: 'Project',
    description: 'Detailed project scope and deliverables document',
    icon: FileText,
    color: 'from-cyan-500 to-blue-500',
    sections: [
      'Project Overview',
      'Detailed Scope',
      'Deliverables',
      'Timeline',
      'Resources',
      'Assumptions',
      'Acceptance Criteria',
    ],
  },
  {
    id: 'freelance',
    name: 'Freelance Service Agreement',
    category: 'Freelance',
    description: 'General freelance work contract',
    icon: FileSignature,
    color: 'from-violet-500 to-purple-500',
    sections: [
      'Services',
      'Compensation',
      'Work Schedule',
      'Expenses',
      'Independent Contractor Status',
      'Intellectual Property',
      'Termination',
    ],
  },
];

export default function ContractsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPreview, setShowPreview] = useState(false);

  const categories = ['All', ...new Set(CONTRACT_TEMPLATES.map((t) => t.category))];

  const filteredTemplates = CONTRACT_TEMPLATES.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const generateContract = (template: ContractTemplate) => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    let contract = `${template.name.toUpperCase()}\n\n`;
    contract += `Date: ${today}\n\n`;
    contract += `This Agreement is entered into between:\n\n`;
    contract += `SERVICE PROVIDER:\n`;
    contract += `[Your Company Name]\n`;
    contract += `[Your Address]\n`;
    contract += `[Your Email]\n\n`;
    contract += `CLIENT:\n`;
    contract += `[Client Name]\n`;
    contract += `[Client Address]\n`;
    contract += `[Client Email]\n\n`;
    contract += `${'='.repeat(80)}\n\n`;

    template.sections.forEach((section, index) => {
      contract += `${index + 1}. ${section.toUpperCase()}\n\n`;

      // Add section-specific content
      switch (section) {
        case 'Project Scope':
        case 'Services Description':
        case 'Design Scope':
        case 'App Specifications':
          contract += `The Service Provider agrees to provide the following services:\n\n`;
          contract += `[Detailed description of services, features, and deliverables]\n\n`;
          contract += `Specific deliverables include:\n`;
          contract += `• [Deliverable 1]\n`;
          contract += `• [Deliverable 2]\n`;
          contract += `• [Deliverable 3]\n\n`;
          break;

        case 'Timeline & Milestones':
        case 'Timeline':
        case 'Development Phases':
          contract += `The project will be completed according to the following timeline:\n\n`;
          contract += `Phase 1: [Description] - [Start Date] to [End Date]\n`;
          contract += `Phase 2: [Description] - [Start Date] to [End Date]\n`;
          contract += `Phase 3: [Description] - [Start Date] to [End Date]\n\n`;
          contract += `Total estimated completion: [Number] weeks/months\n\n`;
          break;

        case 'Payment Terms':
        case 'Payment Schedule':
        case 'Compensation':
          contract += `Total Project Cost: $[Amount]\n\n`;
          contract += `Payment Schedule:\n`;
          contract += `• Deposit (50%): $[Amount] - Due upon signing\n`;
          contract += `• Milestone Payment (25%): $[Amount] - Due [Date]\n`;
          contract += `• Final Payment (25%): $[Amount] - Due upon completion\n\n`;
          contract += `Payment Method: [Bank Transfer / Credit Card / PayPal]\n`;
          contract += `Late Payment: Interest of [X]% per month on overdue amounts\n\n`;
          break;

        case 'Intellectual Property':
        case 'Usage Rights':
          contract += `Upon full payment, all intellectual property rights shall transfer to the Client.\n\n`;
          contract += `The Service Provider retains the right to:\n`;
          contract += `• Display the work in their portfolio\n`;
          contract += `• Use as a case study (with Client approval)\n\n`;
          contract += `Third-party components and libraries remain property of their respective owners.\n\n`;
          break;

        case 'Confidentiality':
        case 'Definition of Confidential Information':
          contract += `Both parties agree to keep confidential any proprietary information shared during this engagement.\n\n`;
          contract += `Confidential Information includes:\n`;
          contract += `• Business strategies and plans\n`;
          contract += `• Technical data and source code\n`;
          contract += `• Customer lists and financial information\n`;
          contract += `• Any information marked as "Confidential"\n\n`;
          contract += `This obligation survives termination of this Agreement.\n\n`;
          break;

        case 'Warranty & Support':
        case 'Maintenance & Updates':
          contract += `The Service Provider warrants that:\n`;
          contract += `• Work will be performed in a professional manner\n`;
          contract += `• Deliverables will be free from defects\n`;
          contract += `• Work will not infringe on third-party rights\n\n`;
          contract += `Support Period: [30/60/90] days from project completion\n`;
          contract += `Support includes bug fixes and minor adjustments only.\n\n`;
          break;

        case 'Termination':
        case 'Termination Clause':
        case 'Cancellation Policy':
          contract += `Either party may terminate this Agreement with [X] days written notice.\n\n`;
          contract += `Upon termination:\n`;
          contract += `• Client pays for all work completed to date\n`;
          contract += `• Service Provider delivers all work in progress\n`;
          contract += `• Both parties return confidential materials\n\n`;
          contract += `The Service Provider may terminate immediately if payments are [X] days overdue.\n\n`;
          break;

        case 'Revisions Policy':
          contract += `The project includes [X] rounds of revisions.\n\n`;
          contract += `Additional revisions beyond the included amount:\n`;
          contract += `• Hourly rate: $[Amount]/hour\n`;
          contract += `• Must be requested in writing\n`;
          contract += `• Will be billed separately\n\n`;
          break;

        case 'Response Times':
        case 'Emergency Support':
          contract += `Service Level Agreement:\n`;
          contract += `• Critical Issues: Response within [X] hours\n`;
          contract += `• High Priority: Response within [X] hours\n`;
          contract += `• Normal Priority: Response within [X] business days\n\n`;
          contract += `Emergency support available 24/7 for critical production issues.\n\n`;
          break;

        default:
          contract += `[Details for ${section}]\n\n`;
      }

      contract += `${'='.repeat(80)}\n\n`;
    });

    contract += `SIGNATURES\n\n`;
    contract += `SERVICE PROVIDER:\n\n`;
    contract += `Signature: _________________________ Date: _____________\n`;
    contract += `Name: [Your Name]\n`;
    contract += `Title: [Your Title]\n\n\n`;
    contract += `CLIENT:\n\n`;
    contract += `Signature: _________________________ Date: _____________\n`;
    contract += `Name: [Client Name]\n`;
    contract += `Title: [Client Title]\n\n`;

    return contract;
  };

  const downloadContract = (template: ContractTemplate) => {
    const content = generateContract(template);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewContract = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            Contract Templates
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Professional legal templates for freelancers and agencies
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          <FileSignature className="w-3 h-3 mr-1" />
          {CONTRACT_TEMPLATES.length} Templates
        </Badge>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                  : ''
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="hover:shadow-lg transition-all cursor-pointer group"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center`}
                >
                  <template.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline">{template.category}</Badge>
              </div>

              <h3 className="font-bold text-lg mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {template.description}
              </p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">Includes:</p>
                <div className="flex flex-wrap gap-1">
                  {template.sections.slice(0, 3).map((section, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {section}
                    </Badge>
                  ))}
                  {template.sections.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.sections.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => previewContract(template)}
                  className="flex-1"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  onClick={() => downloadContract(template)}
                  className={`flex-1 bg-gradient-to-r ${template.color} text-white`}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedTemplate.description}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => downloadContract(selectedTemplate)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="p-6 overflow-auto max-h-[calc(90vh-140px)]">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap">
                {generateContract(selectedTemplate)}
              </div>
            </div>

            <div className="p-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={() => {
                  downloadContract(selectedTemplate);
                  setShowPreview(false);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download & Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <Shield className="w-10 h-10 text-blue-600 mb-3" />
            <h4 className="font-semibold mb-1">Legally Reviewed</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              All templates are reviewed for legal compliance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <FileSignature className="w-10 h-10 text-purple-600 mb-3" />
            <h4 className="font-semibold mb-1">Fully Customizable</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Edit and adapt templates to your specific needs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />
            <h4 className="font-semibold mb-1">Industry Standard</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Based on widely-accepted industry practices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
        <CardContent className="p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Legal Disclaimer:</strong> These templates are provided for informational
            purposes only and do not constitute legal advice. Please consult with a qualified
            attorney in your jurisdiction before using any contract template.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
