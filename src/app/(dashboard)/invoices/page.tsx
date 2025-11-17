'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Download,
  Send,
  Eye,
  Edit,
  Trash2,
  FileText,
  DollarSign,
  Calendar,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Hash,
  Percent,
  X,
  Save,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes?: string;
}

const TEMPLATES = [
  { id: 'modern', name: 'Modern Minimal', gradient: 'from-blue-500 to-cyan-600' },
  { id: 'professional', name: 'Professional', gradient: 'from-purple-500 to-pink-600' },
  { id: 'creative', name: 'Creative Bold', gradient: 'from-orange-500 to-red-600' },
  { id: 'classic', name: 'Classic Formal', gradient: 'from-gray-700 to-gray-900' },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      clientName: 'Acme Corporation',
      clientEmail: 'billing@acmecorp.com',
      clientAddress: '123 Business St, New York, NY 10001',
      issueDate: '2024-12-01',
      dueDate: '2024-12-31',
      items: [
        { description: 'Web Development Services', quantity: 40, rate: 150, amount: 6000 },
        { description: 'UI/UX Design', quantity: 20, rate: 120, amount: 2400 },
      ],
      subtotal: 8400,
      tax: 840,
      total: 9240,
      status: 'sent',
      notes: 'Payment due within 30 days. Thank you for your business!',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [currentInvoice, setCurrentInvoice] = useState<Partial<Invoice>>({
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    tax: 10,
  });

  const addInvoiceItem = () => {
    setCurrentInvoice({
      ...currentInvoice,
      items: [...(currentInvoice.items || []), { description: '', quantity: 1, rate: 0, amount: 0 }],
    });
  };

  const removeInvoiceItem = (index: number) => {
    const items = [...(currentInvoice.items || [])];
    items.splice(index, 1);
    setCurrentInvoice({ ...currentInvoice, items });
  };

  const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const items = [...(currentInvoice.items || [])];
    items[index] = { ...items[index], [field]: value };

    if (field === 'quantity' || field === 'rate') {
      items[index].amount = items[index].quantity * items[index].rate;
    }

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = (subtotal * (currentInvoice.tax || 0)) / 100;
    const total = subtotal + tax;

    setCurrentInvoice({ ...currentInvoice, items, subtotal, total });
  };

  const generatePDF = (invoice: Invoice) => {
    // Generate HTML for PDF
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice ${invoice.invoiceNumber}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; background: #fff; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 3px solid #667eea; padding-bottom: 20px; }
          .company { font-size: 32px; font-weight: bold; color: #667eea; }
          .invoice-title { font-size: 24px; color: #333; }
          .invoice-number { font-size: 14px; color: #666; margin-top: 5px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 14px; font-weight: bold; color: #667eea; margin-bottom: 10px; text-transform: uppercase; }
          .client-info { line-height: 1.6; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          thead { background: #667eea; color: white; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e0e0e0; }
          th { font-weight: 600; }
          .text-right { text-align: right; }
          .totals { margin-top: 20px; text-align: right; }
          .totals-row { display: flex; justify-content: flex-end; margin-bottom: 10px; }
          .totals-label { width: 150px; font-weight: 600; }
          .totals-value { width: 150px; text-align: right; }
          .total-row { font-size: 20px; font-weight: bold; color: #667eea; margin-top: 10px; padding-top: 10px; border-top: 2px solid #667eea; }
          .notes { margin-top: 40px; padding: 20px; background: #f7f7f7; border-radius: 8px; }
          .footer { margin-top: 60px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #e0e0e0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="company">DevBrain</div>
            <div style="color: #666; margin-top: 5px;">Professional Development Services</div>
          </div>
          <div style="text-align: right;">
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-number">${invoice.invoiceNumber}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
          <div class="section">
            <div class="section-title">Bill To:</div>
            <div class="client-info">
              <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">${invoice.clientName}</div>
              <div>${invoice.clientEmail}</div>
              <div>${invoice.clientAddress}</div>
            </div>
          </div>
          <div class="section" style="text-align: right;">
            <div class="section-title">Invoice Details:</div>
            <div class="client-info">
              <div><strong>Issue Date:</strong> ${invoice.issueDate}</div>
              <div><strong>Due Date:</strong> ${invoice.dueDate}</div>
              <div><strong>Status:</strong> <span style="color: ${invoice.status === 'paid' ? '#10b981' : invoice.status === 'overdue' ? '#ef4444' : '#3b82f6'}">${invoice.status.toUpperCase()}</span></div>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="text-right">Quantity</th>
              <th class="text-right">Rate</th>
              <th class="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td class="text-right">${item.quantity}</td>
                <td class="text-right">$${item.rate.toFixed(2)}</td>
                <td class="text-right">$${item.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row">
            <div class="totals-label">Subtotal:</div>
            <div class="totals-value">$${invoice.subtotal.toFixed(2)}</div>
          </div>
          <div class="totals-row">
            <div class="totals-label">Tax (${((invoice.tax / invoice.subtotal) * 100).toFixed(0)}%):</div>
            <div class="totals-value">$${invoice.tax.toFixed(2)}</div>
          </div>
          <div class="totals-row total-row">
            <div class="totals-label">Total:</div>
            <div class="totals-value">$${invoice.total.toFixed(2)}</div>
          </div>
        </div>

        ${invoice.notes ? `
          <div class="notes">
            <div style="font-weight: bold; margin-bottom: 10px;">Notes:</div>
            <div>${invoice.notes}</div>
          </div>
        ` : ''}

        <div class="footer">
          <div>Thank you for your business!</div>
          <div style="margin-top: 10px;">Generated by DevBrain Invoice System</div>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${invoice.invoiceNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveInvoice = () => {
    const newInvoice: Invoice = {
      id: Date.now().toString(),
      invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      clientName: currentInvoice.clientName || '',
      clientEmail: currentInvoice.clientEmail || '',
      clientAddress: currentInvoice.clientAddress || '',
      issueDate: currentInvoice.issueDate || new Date().toISOString().split('T')[0],
      dueDate: currentInvoice.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: currentInvoice.items || [],
      subtotal: currentInvoice.subtotal || 0,
      tax: ((currentInvoice.subtotal || 0) * (currentInvoice.tax || 0)) / 100,
      total: currentInvoice.total || 0,
      status: 'draft',
      notes: currentInvoice.notes,
    };

    setInvoices([...invoices, newInvoice]);
    setShowCreateModal(false);
    setCurrentInvoice({ items: [{ description: '', quantity: 1, rate: 0, amount: 0 }], tax: 10 });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
      sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      overdue: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status as keyof typeof colors];
  };

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.total, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Invoice Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create professional invoices with PDF export
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Paid</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${pendingAmount.toLocaleString()}
                </p>
              </div>
              <Clock className="w-12 h-12 text-blue-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overdue</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  ${overdueAmount.toLocaleString()}
                </p>
              </div>
              <AlertCircle className="w-12 h-12 text-red-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Invoices</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {invoices.length}
                </p>
              </div>
              <FileText className="w-12 h-12 text-purple-600/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices List */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">{invoice.invoiceNumber}</h4>
                      <Badge className={getStatusBadge(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{invoice.clientName}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Due: {invoice.dueDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        ${invoice.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => generatePDF(invoice)}>
                    <Download className="w-3 h-3 mr-1" />
                    PDF
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

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Create New Invoice</CardTitle>
                <Button size="icon" variant="ghost" onClick={() => setShowCreateModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Select Template</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TEMPLATES.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                      }`}
                    >
                      <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${template.gradient} mb-2`} />
                      <p className="text-xs font-medium text-center">{template.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name</label>
                  <Input
                    placeholder="Acme Corporation"
                    value={currentInvoice.clientName || ''}
                    onChange={(e) => setCurrentInvoice({ ...currentInvoice, clientName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Client Email</label>
                  <Input
                    type="email"
                    placeholder="billing@acme.com"
                    value={currentInvoice.clientEmail || ''}
                    onChange={(e) => setCurrentInvoice({ ...currentInvoice, clientEmail: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Client Address</label>
                  <Input
                    placeholder="123 Business St, New York, NY 10001"
                    value={currentInvoice.clientAddress || ''}
                    onChange={(e) => setCurrentInvoice({ ...currentInvoice, clientAddress: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Issue Date</label>
                  <Input
                    type="date"
                    value={currentInvoice.issueDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCurrentInvoice({ ...currentInvoice, issueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <Input
                    type="date"
                    value={currentInvoice.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    onChange={(e) => setCurrentInvoice({ ...currentInvoice, dueDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Invoice Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium">Items</label>
                  <Button size="sm" variant="outline" onClick={addInvoiceItem}>
                    <Plus className="w-3 h-3 mr-1" />
                    Add Item
                  </Button>
                </div>
                <div className="space-y-3">
                  {currentInvoice.items?.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateInvoiceItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          placeholder="Rate"
                          value={item.rate}
                          onChange={(e) => updateInvoiceItem(index, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          placeholder="Amount"
                          value={`$${item.amount.toFixed(2)}`}
                          disabled
                        />
                      </div>
                      <div className="col-span-1">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => removeInvoiceItem(index)}
                          disabled={currentInvoice.items!.length === 1}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="border-t pt-4">
                <div className="flex justify-end space-y-2">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                      <span className="font-semibold">${(currentInvoice.subtotal || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          className="w-16 h-8 text-xs"
                          value={currentInvoice.tax || 0}
                          onChange={(e) => setCurrentInvoice({ ...currentInvoice, tax: parseFloat(e.target.value) || 0 })}
                        />
                        <span className="font-semibold">${(((currentInvoice.subtotal || 0) * (currentInvoice.tax || 0)) / 100).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-purple-600">${(currentInvoice.total || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                <textarea
                  className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                  placeholder="Payment terms, thank you message, etc."
                  value={currentInvoice.notes || ''}
                  onChange={(e) => setCurrentInvoice({ ...currentInvoice, notes: e.target.value })}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={saveInvoice}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
