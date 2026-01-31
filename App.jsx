import React, { useState, useEffect, useMemo } from 'react';
import {
  Wrench, Users, Package, LayoutDashboard, Clock, Play, Pause, Plus,
  Search, ChevronRight, ChevronLeft, AlertTriangle, CheckCircle, Truck,
  Phone, Mail, Edit, Trash2, X, Camera, FileText, Send, Archive,
  ShoppingCart, Calendar, Hash, Settings, Menu, Home, Clipboard,
  User, Box, Timer, Tag, MessageSquare, Bell, Filter, MoreVertical,
  ArrowRight, PackageCheck, PackagePlus, RefreshCw, DollarSign,
  Smartphone, Monitor, ClipboardList, AlertCircle, TrendingUp,
  Receipt, Printer, Download, Image, Upload, Eye, Star, Building2,
  CalendarDays, BarChart3, History, Shield, MessageCircle, Euro, Flag, MapPin
} from 'lucide-react';

const WorkshopManagementSystem = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileActiveTab, setMobileActiveTab] = useState('dashboard');
  
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [showNewJob, setShowNewJob] = useState(false);
  const [showNewPart, setShowNewPart] = useState(false);
  const [showJobDetail, setShowJobDetail] = useState(null);
  const [showPartsOrder, setShowPartsOrder] = useState(null);
  const [showPartSelector, setShowPartSelector] = useState(null);
  const [showInvoice, setShowInvoice] = useState(null);
  const [showNewSupplier, setShowNewSupplier] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(null);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showCustomerHistory, setShowCustomerHistory] = useState(null);
  
  const [jobSearch, setJobSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [partSearch, setPartSearch] = useState('');
  const [supplierSearch, setSupplierSearch] = useState('');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [jobFilter, setJobFilter] = useState('all');
  const [jobDetailTab, setJobDetailTab] = useState('overview');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [reportPeriod, setReportPeriod] = useState('month');

  const [settings] = useState({
    labourRate: 65.00, vatRate: 23, currency: '€',
    businessName: 'MD Burke Ltd', businessAddress: 'Industrial Estate, Trim, Co. Meath',
    businessPhone: '+353 46 943 1234', businessEmail: 'workshop@mdburke.ie',
    businessVat: 'IE1234567T', defaultWarrantyDays: 90
  });

  const [mechanics] = useState([
    { id: 'mech1', name: 'Dave Burke', specialization: 'Diesel Engines', color: '#f59e0b' },
    { id: 'mech2', name: 'Tom Wilson', specialization: 'Hydraulics', color: '#3b82f6' },
    { id: 'mech3', name: 'Mike O\'Brien', specialization: 'Electrical Systems', color: '#10b981' }
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: 'sup1', name: 'AgriParts Direct', contact: 'John Brennan', phone: '+353 1 234 5678', email: 'orders@agriparts.ie', address: 'Dublin 12', accountNumber: 'APD-001234', paymentTerms: '30 days', rating: 5, categories: ['Hydraulics', 'Filters'] },
    { id: 'sup2', name: 'FarmTech Supplies', contact: 'Mary Kelly', phone: '+353 44 934 5678', email: 'sales@farmtech.ie', address: 'Mullingar', accountNumber: 'FTS-005678', paymentTerms: '14 days', rating: 4, categories: ['Electrical', 'Batteries'] },
    { id: 'sup3', name: 'Tractor Spares Ireland', contact: 'Paddy Dunne', phone: '+353 57 862 3456', email: 'info@tractorspares.ie', address: 'Portlaoise', accountNumber: 'TSI-009012', paymentTerms: '30 days', rating: 4, categories: ['Brakes', 'Clutches'] }
  ]);

  const [customers, setCustomers] = useState([
    { id: 'cust1', firstName: 'Patrick', lastName: 'Murphy', phone: '+353 87 123 4567', email: 'pmurphy@farmland.ie', posId: 'POS-001', address: 'Murphy Farm, Dunshaughlin', preferredContact: 'phone', machines: ['John Deere 6120M', 'John Deere 5075E'], createdAt: '2024-01-15', totalSpent: 4850.00, jobCount: 5 },
    { id: 'cust2', firstName: 'Sean', lastName: 'O\'Connor', phone: '+353 86 987 6543', email: 'soconnor@agriworks.ie', posId: 'POS-002', address: 'Agriworks Ltd, Navan', preferredContact: 'email', machines: ['Massey Ferguson 5711', 'JCB Fastrac 4220'], createdAt: '2024-02-20', totalSpent: 12340.00, jobCount: 8 }
  ]);

  const [parts, setParts] = useState([
    { id: 'p1', sku: 'HYD-PUMP-01', name: 'Hydraulic Pump Assembly', price: 485.00, cost: 320.00, stock: 3, minStock: 2, vat: 23, supplierId: 'sup1', category: 'Hydraulics', location: 'A1-01' },
    { id: 'p2', sku: 'FIL-OIL-15', name: 'Oil Filter - Heavy Duty', price: 28.50, cost: 15.00, stock: 45, minStock: 20, vat: 23, supplierId: 'sup1', category: 'Filters', location: 'B2-15' },
    { id: 'p3', sku: 'BRK-PAD-SET', name: 'Brake Pad Set - Tractor', price: 125.00, cost: 75.00, stock: 12, minStock: 5, vat: 23, supplierId: 'sup3', category: 'Brakes', location: 'C1-08' },
    { id: 'p4', sku: 'BLT-FAN-42', name: 'Fan Belt 42mm', price: 34.99, cost: 18.00, stock: 8, minStock: 5, vat: 23, supplierId: 'sup1', category: 'Belts', location: 'B1-22' },
    { id: 'p5', sku: 'SPK-PLG-6', name: 'Spark Plug Set (6)', price: 67.50, cost: 35.00, stock: 0, minStock: 3, vat: 23, supplierId: 'sup2', category: 'Electrical', location: 'D1-05' },
    { id: 'p6', sku: 'BAT-12V-HD', name: 'Battery 12V Heavy Duty', price: 189.00, cost: 120.00, stock: 4, minStock: 2, vat: 23, supplierId: 'sup2', category: 'Electrical', location: 'E1-01' },
    { id: 'p7', sku: 'ALT-UNIT-01', name: 'Alternator Unit', price: 320.00, cost: 210.00, stock: 2, minStock: 1, vat: 23, supplierId: 'sup2', category: 'Electrical', location: 'E1-03' },
    { id: 'p8', sku: 'RAD-HOSE-LG', name: 'Radiator Hose Large', price: 42.00, cost: 22.00, stock: 15, minStock: 8, vat: 23, supplierId: 'sup1', category: 'Cooling', location: 'C2-12' }
  ]);

  const [jobs, setJobs] = useState([
    {
      id: 'job1', tagNumber: 'TAG-2024-001', customerId: 'cust1', machine: 'John Deere 6120M',
      machineSerial: 'JD6120M-2019-45678', machineYear: 2019, machineHours: 4500,
      problem: 'Hydraulic leak from front loader, loss of power when lifting',
      mechanicId: 'mech1', status: 'in-progress', priority: 'high',
      labourSeconds: 7200, timerRunning: false,
      notes: [
        { id: 'n1', text: 'Initial inspection complete - found cracked hydraulic line', date: '2024-03-08 09:30', author: 'Dave Burke' },
        { id: 'n2', text: 'Ordered replacement pump assembly', date: '2024-03-09 14:15', author: 'Dave Burke' }
      ],
      photos: [
        { id: 'ph1', url: '/api/placeholder/400/300', caption: 'Cracked hydraulic line', date: '2024-03-08', type: 'before' }
      ],
      parkedParts: [{ partId: 'p1', qty: 1 }], usedParts: [], repairSummary: '',
      partsOrders: [
        { id: 'po1', partSku: 'HYD-PUMP-01', partName: 'Hydraulic Pump Assembly', qty: 1, unitCost: 320.00, supplier: 'AgriParts Direct', supplierId: 'sup1', poNumber: 'PO-2024-0156', orderDate: '2024-03-10', eta: '2024-03-14', status: 'in-transit', notes: 'Expedited' }
      ],
      communications: [
        { id: 'c1', type: 'phone', direction: 'outbound', date: '2024-03-08 10:00', summary: 'Called customer to confirm diagnosis', status: 'completed' },
        { id: 'c2', type: 'sms', direction: 'outbound', date: '2024-03-10 15:30', summary: 'Parts ordered - ETA Thursday', status: 'sent' }
      ],
      warranty: { isWarrantyWork: false, warrantyProvider: null, claimNumber: null },
      newWarranty: { enabled: true, days: 90, expiryDate: null, covers: 'Labour and parts' },
      estimatedCompletion: '2024-03-15', quotedAmount: 850.00, approved: true, approvedDate: '2024-03-08',
      createdAt: '2024-03-08', completedAt: null, invoiceNumber: null
    },
    {
      id: 'job2', tagNumber: 'TAG-2024-002', customerId: 'cust2', machine: 'Massey Ferguson 5711',
      machineSerial: 'MF5711-2020-12345', machineYear: 2020, machineHours: 2800,
      problem: 'Engine overheating, fan belt squealing',
      mechanicId: 'mech2', status: 'booked-in', priority: 'medium',
      labourSeconds: 0, timerRunning: false, notes: [], photos: [],
      parkedParts: [], usedParts: [], repairSummary: '', partsOrders: [], communications: [],
      warranty: { isWarrantyWork: false }, newWarranty: { enabled: true, days: 90, covers: 'Labour and parts' },
      estimatedCompletion: '2024-03-16', quotedAmount: null, approved: false,
      createdAt: '2024-03-11', completedAt: null, invoiceNumber: null
    },
    {
      id: 'job3', tagNumber: 'TAG-2024-003', customerId: 'cust1', machine: 'John Deere 5075E',
      machineSerial: 'JD5075E-2018-33221', machineYear: 2018, machineHours: 6200,
      problem: 'Annual service - oil change, filters, full inspection',
      mechanicId: 'mech3', status: 'ready-for-collection', priority: 'low',
      labourSeconds: 5400, timerRunning: false,
      notes: [{ id: 'n1', text: 'Service completed - all filters replaced', date: '2024-03-05 16:00', author: 'Mike O\'Brien' }],
      photos: [{ id: 'ph1', url: '/api/placeholder/400/300', caption: 'Service completed', date: '2024-03-05', type: 'after' }],
      parkedParts: [], usedParts: [{ partId: 'p2', qty: 2 }, { partId: 'p4', qty: 1 }],
      repairSummary: 'Annual service completed. Oil and filters changed.',
      partsOrders: [],
      communications: [{ id: 'c1', type: 'sms', direction: 'outbound', date: '2024-03-05 17:00', summary: 'Ready for collection', status: 'sent' }],
      warranty: { isWarrantyWork: false }, newWarranty: { enabled: false },
      estimatedCompletion: '2024-03-05', quotedAmount: 185.00, approved: true,
      createdAt: '2024-03-04', completedAt: '2024-03-05', invoiceNumber: 'INV-2024-0089'
    }
  ]);

  const [messageTemplates] = useState([
    { id: 't1', name: 'Job Booked In', type: 'sms', text: 'Hi {firstName}, your {machine} has been booked in. Tag: {tagNumber}.' },
    { id: 't2', name: 'Quote Ready', type: 'sms', text: 'Hi {firstName}, estimate for your {machine}: {currency}{quote}. Reply YES to approve.' },
    { id: 't3', name: 'Parts Ordered', type: 'sms', text: 'Hi {firstName}, parts ordered for {machine}. ETA: {eta}.' },
    { id: 't4', name: 'Parts Arrived', type: 'sms', text: 'Parts for your {machine} have arrived. Continuing repair.' },
    { id: 't5', name: 'Ready for Collection', type: 'sms', text: 'Hi {firstName}, your {machine} is ready. Total: {currency}{total}. Hours: Mon-Fri 8-6, Sat 9-1.' }
  ]);

  const [newCustomer, setNewCustomer] = useState({ firstName: '', lastName: '', phone: '', email: '', address: '', preferredContact: 'phone' });
  const [newJob, setNewJob] = useState({ customerId: '', machine: '', machineSerial: '', machineYear: '', machineHours: '', problem: '', mechanicId: '', priority: 'medium', estimatedCompletion: '' });
  const [newNote, setNewNote] = useState('');
  const [newPartOrder, setNewPartOrder] = useState({ partId: '', qty: 1, supplierId: '', poNumber: '', eta: '', notes: '' });
  const [newPart, setNewPart] = useState({ sku: '', name: '', price: '', cost: '', stock: '', minStock: '', supplierId: '', category: '', location: '' });
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', phone: '', email: '', address: '', accountNumber: '', paymentTerms: '30 days' });
  const [messageContent, setMessageContent] = useState({ type: 'sms', template: '', customMessage: '' });
  const [photoCaption, setPhotoCaption] = useState('');
  const [repairSummary, setRepairSummary] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setJobs(prev => prev.map(job => job.timerRunning ? { ...job, labourSeconds: job.labourSeconds + 1 } : job));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => `${Math.floor(s/3600).toString().padStart(2,'0')}:${Math.floor((s%3600)/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  const formatHours = (s) => (s / 3600).toFixed(2);
  const formatCurrency = (a) => `${settings.currency}${a.toFixed(2)}`;
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';

  const getCustomer = (id) => customers.find(c => c.id === id);
  const getCustomerName = (id) => { const c = getCustomer(id); return c ? `${c.firstName} ${c.lastName}` : 'Unknown'; };
  const getMechanic = (id) => mechanics.find(m => m.id === id);
  const getMechanicName = (id) => { const m = getMechanic(id); return m ? m.name : 'Unassigned'; };
  const getSupplier = (id) => suppliers.find(s => s.id === id);
  const getSupplierName = (id) => { const s = getSupplier(id); return s ? s.name : 'Unknown'; };
  const getPart = (id) => parts.find(p => p.id === id);

  const getStatusColor = (s) => ({ 'booked-in': 'bg-blue-500', 'in-progress': 'bg-amber-500', 'parts-needed': 'bg-red-500', 'parts-ordered': 'bg-orange-500', 'parts-in-transit': 'bg-yellow-500', 'ready-to-continue': 'bg-lime-500', 'completed': 'bg-green-500', 'ready-for-collection': 'bg-emerald-500', 'collected': 'bg-slate-500' }[s] || 'bg-slate-500');
  const getStatusLabel = (s) => ({ 'booked-in': 'Booked In', 'in-progress': 'In Progress', 'parts-needed': 'Parts Needed', 'parts-ordered': 'Parts Ordered', 'parts-in-transit': 'Parts In Transit', 'ready-to-continue': 'Ready to Continue', 'completed': 'Completed', 'ready-for-collection': 'Ready for Collection', 'collected': 'Collected' }[s] || s);
  const getPriorityColor = (p) => ({ 'low': 'text-green-500', 'medium': 'text-yellow-500', 'high': 'text-orange-500', 'urgent': 'text-red-500' }[p] || 'text-slate-500');
  const getOrderStatusColor = (s) => ({ 'ordered': 'bg-orange-500', 'in-transit': 'bg-yellow-500', 'arrived': 'bg-green-500' }[s] || 'bg-slate-500');

  const calculateJobTotals = (job) => {
    const labourHours = job.labourSeconds / 3600;
    const labourTotal = labourHours * settings.labourRate;
    let partsTotal = 0;
    [...job.usedParts, ...job.parkedParts].forEach(up => {
      const part = getPart(up.partId);
      if (part) partsTotal += part.price * up.qty;
    });
    const subtotal = labourTotal + partsTotal;
    const totalVat = subtotal * (settings.vatRate / 100);
    return { labourHours, labourTotal, partsTotal, subtotal, totalVat, grandTotal: subtotal + totalVat };
  };

  const stats = useMemo(() => {
    const completedJobs = jobs.filter(j => j.completedAt);
    const monthRevenue = completedJobs.reduce((acc, job) => acc + calculateJobTotals(job).grandTotal, 0);
    return {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(j => !['collected', 'completed', 'ready-for-collection'].includes(j.status)).length,
      partsOrdered: jobs.reduce((acc, j) => acc + j.partsOrders.filter(o => o.status !== 'arrived').length, 0),
      partsInTransit: jobs.reduce((acc, j) => acc + j.partsOrders.filter(o => o.status === 'in-transit').length, 0),
      readyForCollection: jobs.filter(j => j.status === 'ready-for-collection').length,
      outOfStock: parts.filter(p => p.stock === 0).length,
      lowStock: parts.filter(p => p.stock > 0 && p.stock <= p.minStock).length,
      monthRevenue,
      mechanicStats: mechanics.map(m => ({
        ...m,
        jobCount: jobs.filter(j => j.mechanicId === m.id).length,
        totalHours: jobs.filter(j => j.mechanicId === m.id).reduce((acc, j) => acc + j.labourSeconds, 0) / 3600
      }))
    };
  }, [jobs, parts, mechanics]);

  const globalSearchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) return { jobs: [], customers: [], parts: [], suppliers: [] };
    const q = globalSearchQuery.toLowerCase();
    return {
      jobs: jobs.filter(j => j.tagNumber.toLowerCase().includes(q) || j.machine.toLowerCase().includes(q) || getCustomerName(j.customerId).toLowerCase().includes(q)).slice(0, 5),
      customers: customers.filter(c => `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) || c.phone.includes(q)).slice(0, 5),
      parts: parts.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)).slice(0, 5),
      suppliers: suppliers.filter(s => s.name.toLowerCase().includes(q)).slice(0, 5)
    };
  }, [globalSearchQuery, jobs, customers, parts, suppliers]);

  const toggleTimer = (jobId) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const newStatus = job.status === 'booked-in' && !job.timerRunning ? 'in-progress' : job.status;
        return { ...job, timerRunning: !job.timerRunning, status: newStatus };
      }
      return job;
    }));
  };

  const addCustomer = () => {
    if (!newCustomer.firstName || !newCustomer.lastName) return;
    setCustomers(prev => [...prev, { id: `cust${Date.now()}`, ...newCustomer, posId: `POS-${Date.now().toString().slice(-6)}`, machines: [], createdAt: new Date().toISOString().split('T')[0], totalSpent: 0, jobCount: 0 }]);
    setNewCustomer({ firstName: '', lastName: '', phone: '', email: '', address: '', preferredContact: 'phone' });
    setShowNewCustomer(false);
  };

  const addJob = () => {
    if (!newJob.customerId || !newJob.machine) return;
    const job = {
      id: `job${Date.now()}`, tagNumber: `TAG-2024-${String(jobs.length + 1).padStart(3, '0')}`,
      ...newJob, machineYear: parseInt(newJob.machineYear) || null, machineHours: parseInt(newJob.machineHours) || null,
      status: 'booked-in', labourSeconds: 0, timerRunning: false, notes: [], photos: [],
      parkedParts: [], usedParts: [], repairSummary: '', partsOrders: [], communications: [],
      warranty: { isWarrantyWork: false }, newWarranty: { enabled: true, days: settings.defaultWarrantyDays, covers: 'Labour and parts' },
      quotedAmount: null, approved: false, createdAt: new Date().toISOString().split('T')[0], completedAt: null, invoiceNumber: null
    };
    setJobs(prev => [...prev, job]);
    setNewJob({ customerId: '', machine: '', machineSerial: '', machineYear: '', machineHours: '', problem: '', mechanicId: '', priority: 'medium', estimatedCompletion: '' });
    setShowNewJob(false);
  };

  const addNote = (jobId, noteText) => {
    if (!noteText?.trim()) return;
    const job = jobs.find(j => j.id === jobId);
    const mechanic = getMechanic(job?.mechanicId);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, notes: [...j.notes, { id: `n${Date.now()}`, text: noteText.trim(), date: new Date().toISOString().replace('T', ' ').slice(0, 16), author: mechanic?.name || 'System' }] } : j));
    setNewNote('');
  };

  const addPhoto = (jobId, type = 'during') => {
    setJobs(prev => prev.map(job => job.id === jobId ? { ...job, photos: [...job.photos, { id: `ph${Date.now()}`, url: '/api/placeholder/400/300', caption: photoCaption || `Photo ${job.photos.length + 1}`, date: new Date().toISOString().split('T')[0], type }] } : job));
    setPhotoCaption('');
  };

  const parkPart = (jobId, partId, qty) => {
    const part = getPart(partId);
    if (!part || part.stock < qty) return;
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const existing = job.parkedParts.find(p => p.partId === partId);
        if (existing) return { ...job, parkedParts: job.parkedParts.map(p => p.partId === partId ? { ...p, qty: p.qty + qty } : p) };
        return { ...job, parkedParts: [...job.parkedParts, { partId, qty }] };
      }
      return job;
    }));
    setShowPartSelector(null);
  };

  const removeParkedPart = (jobId, partId) => {
    setJobs(prev => prev.map(job => job.id === jobId ? { ...job, parkedParts: job.parkedParts.filter(p => p.partId !== partId) } : job));
  };

  const allocateParts = (jobId) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const newUsedParts = [...job.usedParts];
        job.parkedParts.forEach(parked => {
          const existing = newUsedParts.find(u => u.partId === parked.partId);
          if (existing) existing.qty += parked.qty;
          else newUsedParts.push({ ...parked });
        });
        setParts(prevParts => prevParts.map(part => {
          const parked = job.parkedParts.find(p => p.partId === part.id);
          return parked ? { ...part, stock: Math.max(0, part.stock - parked.qty) } : part;
        }));
        return { ...job, usedParts: newUsedParts, parkedParts: [] };
      }
      return job;
    }));
  };

  const createPartsOrder = (jobId) => {
    if (!newPartOrder.partId || !newPartOrder.supplierId) return;
    const part = getPart(newPartOrder.partId);
    const supplier = getSupplier(newPartOrder.supplierId);
    const order = { id: `po${Date.now()}`, partSku: part.sku, partName: part.name, qty: newPartOrder.qty, unitCost: part.cost, supplier: supplier.name, supplierId: newPartOrder.supplierId, poNumber: newPartOrder.poNumber || `PO-${Date.now().toString().slice(-8)}`, orderDate: new Date().toISOString().split('T')[0], eta: newPartOrder.eta, status: 'ordered', notes: newPartOrder.notes };
    setJobs(prev => prev.map(job => job.id === jobId ? { ...job, partsOrders: [...job.partsOrders, order], status: ['parts-needed', 'in-progress'].includes(job.status) ? 'parts-ordered' : job.status } : job));
    setNewPartOrder({ partId: '', qty: 1, supplierId: '', poNumber: '', eta: '', notes: '' });
    setShowPartsOrder(null);
  };

  const updateOrderStatus = (jobId, orderId, status) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const updatedOrders = job.partsOrders.map(o => o.id === orderId ? { ...o, status } : o);
        let newStatus = job.status;
        if (status === 'in-transit' && job.status === 'parts-ordered') newStatus = 'parts-in-transit';
        else if (status === 'arrived' && updatedOrders.every(o => o.status === 'arrived')) newStatus = 'ready-to-continue';
        return { ...job, partsOrders: updatedOrders, status: newStatus };
      }
      return job;
    }));
  };

  const updateJobStatus = (jobId, status) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        let updates = { status };
        if (status === 'completed') {
          updates.timerRunning = false;
          updates.completedAt = new Date().toISOString().split('T')[0];
          if (job.newWarranty?.enabled) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + job.newWarranty.days);
            updates.newWarranty = { ...job.newWarranty, expiryDate: expiryDate.toISOString().split('T')[0] };
          }
        }
        if (status === 'ready-for-collection' && !job.invoiceNumber) updates.invoiceNumber = `INV-2024-${String(jobs.filter(j => j.invoiceNumber).length + 1).padStart(4, '0')}`;
        if (status === 'collected') {
          updates.collectedAt = new Date().toISOString().split('T')[0];
          const totals = calculateJobTotals({ ...job, ...updates });
          setCustomers(prevCust => prevCust.map(c => c.id === job.customerId ? { ...c, totalSpent: c.totalSpent + totals.grandTotal, jobCount: c.jobCount + 1 } : c));
        }
        return { ...job, ...updates };
      }
      return job;
    }));
  };

  const saveRepairSummary = (jobId, summary) => setJobs(prev => prev.map(job => job.id === jobId ? { ...job, repairSummary: summary } : job));
  
  const addCommunication = (jobId, comm) => setJobs(prev => prev.map(job => job.id === jobId ? { ...job, communications: [...job.communications, { id: `c${Date.now()}`, ...comm, date: new Date().toISOString().replace('T', ' ').slice(0, 16), status: 'sent' }] } : job));

  const addSupplier = () => {
    if (!newSupplier.name) return;
    setSuppliers(prev => [...prev, { id: `sup${Date.now()}`, ...newSupplier, rating: 3, categories: [] }]);
    setNewSupplier({ name: '', contact: '', phone: '', email: '', address: '', accountNumber: '', paymentTerms: '30 days' });
    setShowNewSupplier(false);
  };

  const addPart = () => {
    if (!newPart.sku || !newPart.name) return;
    setParts(prev => [...prev, { id: `p${Date.now()}`, ...newPart, price: parseFloat(newPart.price) || 0, cost: parseFloat(newPart.cost) || 0, stock: parseInt(newPart.stock) || 0, minStock: parseInt(newPart.minStock) || 0, vat: settings.vatRate }]);
    setNewPart({ sku: '', name: '', price: '', cost: '', stock: '', minStock: '', supplierId: '', category: '', location: '' });
    setShowNewPart(false);
  };

  const filteredJobs = useMemo(() => jobs.filter(job => {
    const matchesSearch = job.tagNumber.toLowerCase().includes(jobSearch.toLowerCase()) || job.machine.toLowerCase().includes(jobSearch.toLowerCase()) || getCustomerName(job.customerId).toLowerCase().includes(jobSearch.toLowerCase());
    if (jobFilter === 'all') return matchesSearch;
    if (jobFilter === 'active') return matchesSearch && !['collected', 'completed', 'ready-for-collection'].includes(job.status);
    return matchesSearch && job.status === jobFilter;
  }), [jobs, jobSearch, jobFilter]);

  const filteredCustomers = useMemo(() => customers.filter(c => `${c.firstName} ${c.lastName}`.toLowerCase().includes(customerSearch.toLowerCase()) || c.phone.includes(customerSearch)), [customers, customerSearch]);
  const filteredParts = useMemo(() => parts.filter(p => p.name.toLowerCase().includes(partSearch.toLowerCase()) || p.sku.toLowerCase().includes(partSearch.toLowerCase())), [parts, partSearch]);
  const filteredSuppliers = useMemo(() => suppliers.filter(s => s.name.toLowerCase().includes(supplierSearch.toLowerCase())), [suppliers, supplierSearch]);

  const StatusBadge = ({ status, size = 'normal' }) => <span className={`${getStatusColor(status)} ${size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'} rounded-full text-white font-medium whitespace-nowrap`}>{getStatusLabel(status)}</span>;
  const PriorityBadge = ({ priority }) => <span className={`${getPriorityColor(priority)} text-xs font-medium uppercase flex items-center gap-1`}><Flag className="w-3 h-3" />{priority}</span>;
  const StarRating = ({ rating }) => <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= rating ? 'text-amber-500 fill-amber-500' : 'text-slate-600'}`} />)}</div>;

  const Modal = ({ show, onClose, title, children, wide }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className={`bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl ${wide ? 'w-full max-w-5xl' : 'w-full max-w-lg'} max-h-[90vh] overflow-hidden flex flex-col`}>
          <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg"><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="p-4 overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, label, value, subValue, color = 'amber' }) => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700">
      <div className="flex items-center gap-3">
        <div className={`p-3 bg-${color}-500/20 rounded-lg`}><Icon className={`w-6 h-6 text-${color}-500`} /></div>
        <div>
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subValue && <p className="text-slate-500 text-xs">{subValue}</p>}
        </div>
      </div>
    </div>
  );
e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" /></div>
        <button onClick={() => setShowNewSupplier(true)} className="flex items-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl"><Plus className="w-5 h-5" /><span>Add Supplier</span></button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSuppliers.map(supplier => (
          <div key={supplier.id} className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700">
            <div className="flex items-start justify-between mb-3"><div><h3 className="text-white font-semibold text-lg">{supplier.name}</h3><p className="text-slate-400 text-sm">{supplier.contact}</p></div><StarRating rating={supplier.rating} /></div>
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-slate-400 text-sm"><Phone className="w-4 h-4" /><span>{supplier.phone}</span></div>
              <div className="flex items-center gap-2 text-slate-400 text-sm"><Mail className="w-4 h-4" /><span className="truncate">{supplier.email}</span></div>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">{supplier.categories.map((cat, i) => <span key={i} className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">{cat}</span>)}</div>
            <div className="pt-3 border-t border-slate-700 flex justify-between items-center text-sm"><span className="text-slate-500">A/C: {supplier.accountNumber}</span><span className="text-slate-400">{supplier.paymentTerms}</span></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Calendar View
  const CalendarView = () => {
    const getWeekDays = (date) => {
      const start = new Date(date); start.setDate(start.getDate() - start.getDay() + 1);
      return Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
    };
    const weekDays = getWeekDays(calendarDate);
    const today = new Date().toISOString().split('T')[0];
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => { const d = new Date(calendarDate); d.setDate(d.getDate() - 7); setCalendarDate(d); }} className="p-2 hover:bg-slate-700 rounded-lg"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
            <h2 className="text-xl font-semibold text-white">{calendarDate.toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })}</h2>
            <button onClick={() => { const d = new Date(calendarDate); d.setDate(d.getDate() + 7); setCalendarDate(d); }} className="p-2 hover:bg-slate-700 rounded-lg"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
          </div>
          <button onClick={() => setCalendarDate(new Date())} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">Today</button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <div key={day} className="text-center text-slate-400 font-medium py-2">{day}</div>)}
          {weekDays.map(day => {
            const dateStr = day.toISOString().split('T')[0];
            const dayJobs = jobs.filter(j => j.estimatedCompletion === dateStr || j.createdAt === dateStr);
            const isToday = dateStr === today;
            return (
              <div key={dateStr} className={`min-h-32 p-2 rounded-xl border ${isToday ? 'border-amber-500 bg-amber-500/10' : 'border-slate-700 bg-slate-800'}`}>
                <div className={`text-sm font-medium mb-2 ${isToday ? 'text-amber-500' : 'text-slate-400'}`}>{day.getDate()}</div>
                <div className="space-y-1">
                  {dayJobs.slice(0, 3).map(job => <div key={job.id} onClick={() => setShowJobDetail(job.id)} className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${getStatusColor(job.status)}`}><span className="text-white truncate block">{job.tagNumber.split('-')[2]}</span></div>)}
                  {dayJobs.length > 3 && <div className="text-xs text-slate-500 text-center">+{dayJobs.length - 3} more</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Reports View
  const ReportsView = () => {
    const completedJobs = jobs.filter(j => j.completedAt);
    const totalRevenue = completedJobs.reduce((acc, job) => acc + calculateJobTotals(job).grandTotal, 0);
    const avgJobValue = completedJobs.length > 0 ? totalRevenue / completedJobs.length : 0;
    
    return (
      <div className="space-y-6">
        <div className="flex bg-slate-800 rounded-xl p-1 w-fit">
          {['week', 'month', 'quarter', 'year'].map(period => <button key={period} onClick={() => setReportPeriod(period)} className={`px-4 py-2 rounded-lg ${reportPeriod === period ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'}`}>{period.charAt(0).toUpperCase() + period.slice(1)}</button>)}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Euro} label="Total Revenue" value={formatCurrency(totalRevenue)} color="green" />
          <StatCard icon={Clipboard} label="Jobs Completed" value={completedJobs.length} color="blue" />
          <StatCard icon={Clock} label="Labour Hours" value={`${(jobs.reduce((a, j) => a + j.labourSeconds, 0) / 3600).toFixed(1)}h`} color="purple" />
          <StatCard icon={TrendingUp} label="Avg Job Value" value={formatCurrency(avgJobValue)} color="amber" />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Mechanic Performance</h3>
            <div className="space-y-4">
              {stats.mechanicStats.map(mech => (
                <div key={mech.id} className="space-y-2">
                  <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: mech.color }} /><span className="text-white font-medium">{mech.name}</span></div><span className="text-slate-400">{mech.jobCount} jobs</span></div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-slate-900 p-2 rounded"><p className="text-slate-500">Hours</p><p className="text-white font-medium">{mech.totalHours.toFixed(1)}h</p></div>
                    <div className="bg-slate-900 p-2 rounded"><p className="text-slate-500">Avg/Job</p><p className="text-white font-medium">{mech.jobCount > 0 ? (mech.totalHours / mech.jobCount).toFixed(1) : 0}h</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Jobs by Status</h3>
            <div className="grid grid-cols-2 gap-3">
              {[{ status: 'booked-in', label: 'Booked In' }, { status: 'in-progress', label: 'In Progress' }, { status: 'parts-ordered', label: 'Parts Ordered' }, { status: 'completed', label: 'Completed' }, { status: 'ready-for-collection', label: 'Ready' }, { status: 'collected', label: 'Collected' }].map(({ status, label }) => {
                const count = jobs.filter(j => j.status === status).length;
                return <div key={status} className="bg-slate-900 p-4 rounded-xl"><p className="text-white text-2xl font-bold">{count}</p><p className="text-slate-400 text-sm">{label}</p></div>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Job Detail View
  const JobDetailView = ({ jobId }) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return null;
    const customer = getCustomer(job.customerId);
    const mechanic = getMechanic(job.mechanicId);
    const totals = calculateJobTotals(job);

    return (
      <Modal show={true} onClose={() => setShowJobDetail(null)} title={`Job ${job.tagNumber}`} wide>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-slate-700">
            <StatusBadge status={job.status} /><PriorityBadge priority={job.priority} />
            <span className="text-slate-400">{job.machine}</span><span className="text-slate-500">•</span><span className="text-slate-400">{customer?.firstName} {customer?.lastName}</span>
            {job.invoiceNumber && <><span className="text-slate-500">•</span><span className="text-amber-500 font-mono">{job.invoiceNumber}</span></>}
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Labour Time ({formatCurrency(settings.labourRate)}/hr)</p>
              <p className={`text-3xl font-mono font-bold ${job.timerRunning ? 'text-green-400' : 'text-white'}`}>{formatTime(job.labourSeconds)}</p>
              <p className="text-slate-500 text-sm">{formatHours(job.labourSeconds)} hours = {formatCurrency(totals.labourTotal)}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleTimer(job.id)} className={`p-4 rounded-xl ${job.timerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>{job.timerRunning ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}</button>
              <button onClick={() => setShowInvoice(job.id)} className="p-4 rounded-xl bg-amber-500 hover:bg-amber-600" title="View Invoice"><Receipt className="w-8 h-8 text-black" /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-900 p-3 rounded-lg"><p className="text-slate-500 text-xs">Serial</p><p className="text-white font-mono text-sm">{job.machineSerial || 'N/A'}</p></div>
            <div className="bg-slate-900 p-3 rounded-lg"><p className="text-slate-500 text-xs">Year / Hours</p><p className="text-white text-sm">{job.machineYear || '-'} / {job.machineHours || '-'}h</p></div>
            <div className="bg-slate-900 p-3 rounded-lg"><p className="text-slate-500 text-xs">Est. Completion</p><p className="text-white text-sm">{formatDate(job.estimatedCompletion)}</p></div>
            <div className="bg-slate-900 p-3 rounded-lg"><p className="text-slate-500 text-xs">Quote</p><p className={`text-sm font-medium ${job.approved ? 'text-green-400' : 'text-amber-500'}`}>{job.quotedAmount ? formatCurrency(job.quotedAmount) : 'Not set'}{job.approved && <CheckCircle className="w-4 h-4 inline ml-1" />}</p></div>
          </div>

          <div className="flex border-b border-slate-700 overflow-x-auto">
            {['overview', 'parts', 'orders', 'photos', 'comms'].map(tab => <button key={tab} onClick={() => setJobDetailTab(tab)} className={`px-4 py-2 font-medium whitespace-nowrap ${jobDetailTab === tab ? 'text-amber-500 border-b-2 border-amber-500' : 'text-slate-400 hover:text-white'}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>)}
          </div>

          <div className="min-h-48">
            {jobDetailTab === 'overview' && (
              <div className="space-y-4">
                <div><h4 className="text-slate-400 text-sm mb-2">Problem Description</h4><p className="text-white bg-slate-900 p-3 rounded-lg">{job.problem}</p></div>
                <div><h4 className="text-slate-400 text-sm mb-2">Mechanic</h4><div className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: mechanic?.color || '#64748b' }} /><span className="text-white">{mechanic?.name || 'Unassigned'}</span><span className="text-slate-500">•</span><span className="text-slate-400">{mechanic?.specialization}</span></div></div>
                
                <div>
                  <h4 className="text-slate-400 text-sm mb-2">Repair Summary</h4>
                  {['completed', 'ready-for-collection', 'collected'].includes(job.status) ? (
                    <div className="bg-slate-900 p-3 rounded-lg text-white">{job.repairSummary || 'No summary entered'}</div>
                  ) : (
                    <div className="space-y-2">
                      <textarea value={repairSummary || job.repairSummary} onChange={(e) => setRepairSummary(e.target.value)} placeholder="Enter repair summary..." rows={3} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 resize-none" />
                      <button onClick={() => { saveRepairSummary(job.id, repairSummary); setRepairSummary(''); }} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg text-sm">Save Summary</button>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-slate-400 text-sm mb-2">Notes ({job.notes.length})</h4>
                  <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                    {job.notes.map(note => <div key={note.id} className="bg-slate-900 p-3 rounded-lg"><p className="text-slate-300">{note.text}</p><p className="text-slate-500 text-xs mt-1">{note.author} • {note.date}</p></div>)}
                    {job.notes.length === 0 && <p className="text-slate-500 text-sm">No notes yet</p>}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add a note..." className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500" onKeyDown={(e) => e.key === 'Enter' && addNote(job.id, newNote)} />
                    <button onClick={() => addNote(job.id, newNote)} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg">Add</button>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg">
                  <h4 className="text-slate-400 text-sm mb-3">Customer Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-slate-300"><Phone className="w-4 h-4 text-slate-500" /><span>{customer?.phone}</span></div>
                    <div className="flex items-center gap-2 text-slate-300"><Mail className="w-4 h-4 text-slate-500" /><span className="truncate">{customer?.email}</span></div>
                  </div>
                  <button onClick={() => setShowSendMessage({ customerId: job.customerId, jobId: job.id })} className="mt-3 w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center gap-2"><MessageSquare className="w-4 h-4" />Send Message</button>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700">
                  {job.status === 'in-progress' && <button onClick={() => updateJobStatus(job.id, 'parts-needed')} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">Mark Parts Needed</button>}
                  {job.status === 'ready-to-continue' && <button onClick={() => updateJobStatus(job.id, 'in-progress')} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg">Continue Work</button>}
                  {['in-progress', 'ready-to-continue'].includes(job.status) && <button onClick={() => { allocateParts(job.id); updateJobStatus(job.id, 'completed'); }} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">Complete Job</button>}
                  {job.status === 'completed' && <button onClick={() => updateJobStatus(job.id, 'ready-for-collection')} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg">Ready for Collection</button>}
                  {job.status === 'ready-for-collection' && <button onClick={() => updateJobStatus(job.id, 'collected')} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg">Mark Collected</button>}
                </div>
              </div>
            )}

            {jobDetailTab === 'parts' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2"><h4 className="text-yellow-500 font-medium flex items-center gap-2"><PackagePlus className="w-4 h-4" />Parked Parts (Reserved)</h4><button onClick={() => setShowPartSelector(job.id)} className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 rounded-lg text-sm">+ Park Part</button></div>
                  {job.parkedParts.length === 0 ? <p className="text-slate-500 text-sm bg-slate-900 p-4 rounded-lg">No parts parked</p> : (
                    <div className="space-y-2">
                      {job.parkedParts.map(pp => { const part = getPart(pp.partId); return part ? <div key={pp.partId} className="flex items-center justify-between bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/30"><div><span className="text-white">{part.name}</span><span className="text-yellow-500 ml-2 font-mono text-sm">{part.sku}</span></div><div className="flex items-center gap-3"><span className="text-yellow-500">x{pp.qty} = {formatCurrency(part.price * pp.qty)}</span><button onClick={() => removeParkedPart(job.id, pp.partId)} className="p-1 hover:bg-red-500/20 rounded"><X className="w-4 h-4 text-red-400" /></button></div></div> : null; })}
                      <div className="flex justify-between pt-2 text-sm"><span className="text-slate-400">Parked Total:</span><span className="text-yellow-500 font-medium">{formatCurrency(job.parkedParts.reduce((acc, pp) => { const part = getPart(pp.partId); return acc + (part ? part.price * pp.qty : 0); }, 0))}</span></div>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-green-500 font-medium flex items-center gap-2 mb-2"><PackageCheck className="w-4 h-4" />Used Parts (Allocated)</h4>
                  {job.usedParts.length === 0 ? <p className="text-slate-500 text-sm bg-slate-900 p-4 rounded-lg">No parts allocated</p> : (
                    <div className="space-y-2">
                      {job.usedParts.map(up => { const part = getPart(up.partId); return part ? <div key={up.partId} className="flex items-center justify-between bg-green-500/10 p-3 rounded-lg border border-green-500/30"><div><span className="text-white">{part.name}</span><span className="text-green-500 ml-2 font-mono text-sm">{part.sku}</span></div><span className="text-green-500">x{up.qty} = {formatCurrency(part.price * up.qty)}</span></div> : null; })}
                      <div className="flex justify-between pt-2 text-sm"><span className="text-slate-400">Used Total:</span><span className="text-green-500 font-medium">{formatCurrency(totals.partsTotal)}</span></div>
                    </div>
                  )}
                </div>
                <div className="bg-slate-900 p-4 rounded-lg mt-4">
                  <h4 className="text-slate-400 text-sm mb-3">Job Totals</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-400">Labour ({formatHours(job.labourSeconds)}h × {formatCurrency(settings.labourRate)})</span><span className="text-white">{formatCurrency(totals.labourTotal)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Parts</span><span className="text-white">{formatCurrency(totals.partsTotal)}</span></div>
                    <div className="flex justify-between border-t border-slate-700 pt-2"><span className="text-slate-400">Subtotal</span><span className="text-white">{formatCurrency(totals.subtotal)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">VAT ({settings.vatRate}%)</span><span className="text-white">{formatCurrency(totals.totalVat)}</span></div>
                    <div className="flex justify-between border-t border-slate-700 pt-2 text-lg font-bold"><span className="text-amber-500">Grand Total</span><span className="text-amber-500">{formatCurrency(totals.grandTotal)}</span></div>
                  </div>
                </div>
              </div>
            )}

            {jobDetailTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between"><h4 className="text-blue-400 font-medium flex items-center gap-2"><Truck className="w-4 h-4" />Parts Orders</h4><button onClick={() => setShowPartsOrder(job.id)} className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm">+ New Order</button></div>
                {job.partsOrders.length === 0 ? <p className="text-slate-500 text-sm bg-slate-900 p-4 rounded-lg">No parts on order</p> : (
                  <div className="space-y-3">
                    {job.partsOrders.map(order => (
                      <div key={order.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-start justify-between mb-3"><div><p className="text-white font-medium">{order.partName}</p><p className="text-slate-400 text-sm font-mono">{order.partSku}</p></div><span className={`${getOrderStatusColor(order.status)} px-2 py-1 rounded-full text-xs text-white uppercase`}>{order.status.replace('-', ' ')}</span></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                          <div><span className="text-slate-500">Qty</span><span className="text-slate-300 ml-2">{order.qty}</span></div>
                          <div><span className="text-slate-500">Supplier</span><span className="text-slate-300 ml-2">{order.supplier}</span></div>
                          <div><span className="text-slate-500">PO#</span><span className="text-slate-300 ml-2 font-mono">{order.poNumber}</span></div>
                          <div><span className="text-slate-500">ETA</span><span className="text-slate-300 ml-2">{formatDate(order.eta)}</span></div>
                        </div>
                        {order.notes && <p className="text-slate-500 text-sm mb-3 italic">{order.notes}</p>}
                        <div className="flex gap-2">
                          {order.status === 'ordered' && <button onClick={() => updateOrderStatus(job.id, order.id, 'in-transit')} className="flex-1 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm">Mark In Transit</button>}
                          {order.status !== 'arrived' && <button onClick={() => updateOrderStatus(job.id, order.id, 'arrived')} className="flex-1 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm">Mark Arrived</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {jobDetailTab === 'photos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-slate-400 font-medium flex items-center gap-2"><Camera className="w-4 h-4" />Photos ({job.photos.length})</h4>
                  <div className="flex gap-2">
                    <input type="text" value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value)} placeholder="Caption..." className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 w-32" />
                    <button onClick={() => addPhoto(job.id, 'before')} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm">+ Before</button>
                    <button onClick={() => addPhoto(job.id, 'during')} className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-sm">+ During</button>
                    <button onClick={() => addPhoto(job.id, 'after')} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm">+ After</button>
                  </div>
                </div>
                {job.photos.length === 0 ? (
                  <div className="bg-slate-900 p-8 rounded-lg text-center"><Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-500">No photos yet</p></div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['before', 'during', 'after'].map(type => {
                      const typePhotos = job.photos.filter(p => p.type === type);
                      return (
                        <div key={type}>
                          <h5 className={`text-sm font-medium mb-2 ${type === 'before' ? 'text-red-400' : type === 'during' ? 'text-amber-400' : 'text-green-400'}`}>{type.charAt(0).toUpperCase() + type.slice(1)} ({typePhotos.length})</h5>
                          <div className="space-y-2">
                            {typePhotos.map(photo => (
                              <div key={photo.id} className="relative rounded-lg overflow-hidden border border-slate-700">
                                <div className="bg-slate-800 aspect-video flex items-center justify-center"><Image className="w-12 h-12 text-slate-600" /></div>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2"><p className="text-white text-xs truncate">{photo.caption}</p><p className="text-slate-500 text-xs">{photo.date}</p></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {jobDetailTab === 'comms' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between"><h4 className="text-slate-400 font-medium flex items-center gap-2"><MessageCircle className="w-4 h-4" />Communication Log ({job.communications.length})</h4><button onClick={() => setShowSendMessage({ customerId: job.customerId, jobId: job.id })} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm">+ Send Message</button></div>
                {job.communications.length === 0 ? <div className="bg-slate-900 p-8 rounded-lg text-center"><MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" /><p className="text-slate-500">No communications logged</p></div> : (
                  <div className="space-y-2">
                    {job.communications.map(comm => (
                      <div key={comm.id} className="bg-slate-900 p-3 rounded-lg flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${comm.type === 'sms' ? 'bg-green-500/20' : comm.type === 'email' ? 'bg-blue-500/20' : 'bg-amber-500/20'}`}>{comm.type === 'sms' ? <MessageSquare className="w-4 h-4 text-green-400" /> : comm.type === 'email' ? <Mail className="w-4 h-4 text-blue-400" /> : <Phone className="w-4 h-4 text-amber-400" />}</div>
                        <div className="flex-1"><div className="flex items-center gap-2 mb-1"><span className="text-white font-medium capitalize">{comm.type}</span><span className={`text-xs ${comm.direction === 'outbound' ? 'text-blue-400' : 'text-green-400'}`}>{comm.direction === 'outbound' ? '→ Sent' : '← Received'}</span><span className="text-slate-500 text-xs">{comm.date}</span></div><p className="text-slate-300 text-sm">{comm.summary}</p></div>
                        <span className={`px-2 py-0.5 rounded text-xs ${comm.status === 'sent' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>{comm.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  };
900 border border-slate-700 rounded-lg text-white" /></div>
          <div><label className="block text-slate-400 text-sm mb-1">Notes</label><textarea value={newPartOrder.notes} onChange={(e) => setNewPartOrder({ ...newPartOrder, notes: e.target.value })} rows={2} placeholder="e.g. Expedite shipping" className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 resize-none" /></div>
          <button onClick={() => createPartsOrder(showPartsOrder)} className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl">Create Order</button>
        </div>
      </Modal>

      {showJobDetail && <JobDetailView jobId={showJobDetail} />}
      {showInvoice && <InvoiceView jobId={showInvoice} />}
      {showSendMessage && <SendMessageModal data={showSendMessage} />}
      {showCustomerHistory && <CustomerHistoryModal customerId={showCustomerHistory} />}
      {showGlobalSearch && <GlobalSearchModal />}
    </div>
  );
};

export default WorkshopManagementSystem;
