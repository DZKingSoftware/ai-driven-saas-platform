
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, CreditCard, LogOut, User, Zap, Clock, 
  FileText, Share2, Mail, TrendingUp, ChevronRight,
  Copy, Check, Loader2, RefreshCw, Crown, History
} from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../lib/api';

const templates = [
  { id: 'seo-blog', name: 'SEO Blog Post', icon: <FileText className="w-5 h-5" />, category: 'Content', pro: false },
  { id: 'social-media', name: 'Social Media', icon: <Share2 className="w-5 h-5" />, category: 'Marketing', pro: false },
  { id: 'email-marketing', name: 'Email Marketing', icon: <Mail className="w-5 h-5" />, category: 'Marketing', pro: false },
  { id: 'product-description', name: 'Product Description', icon: <TrendingUp className="w-5 h-5" />, category: 'E-commerce', pro: true },
  { id: 'video-script', name: 'Video Script', icon: <Sparkles className="w-5 h-5" />, category: 'Video', pro: true },
  { id: 'data-analysis', name: 'Data Analysis', icon: <TrendingUp className="w-5 h-5" />, category: 'Analytics', pro: true },
];

export default function Dashboard() {
  const { user, logout, fetchUser } = useAuth();
  const { addToast } = useToast();
  
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiProvider, setAiProvider] = useState('openai');
  const [activeTab, setActiveTab] = useState('playground');
  const [generations, setGenerations] = useState([]);
  const [loadingGenerations, setLoadingGenerations] = useState(false);

  useEffect(() => {
    if (activeTab === 'history') {
      fetchGenerations();
    }
  }, [activeTab]);

  const fetchGenerations = async () => {
    setLoadingGenerations(true);
    try {
      const response = await api.get('/ai/generations');
      setGenerations(response.data.data);
    } catch (error) {
      addToast('Failed to load history', 'error');
    } finally {
      setLoadingGenerations(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      addToast('Please enter a prompt', 'error');
      return;
    }

    if (user.tokenBalance < 300) {
      addToast('Insufficient tokens. Please upgrade your plan.', 'error');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await api.post('/ai/generate', {
        templateId: selectedTemplate.id,
        prompt: prompt,
        aiProvider,
      });

      setResult({
        text: response.data.result,
        tokensUsed: response.data.tokensUsed,
        generationId: response.data.generationId,
      });

      addToast(`Generated! Used ${response.data.tokensUsed} tokens`, 'success');
      fetchUser();
    } catch (error) {
      addToast(error.response?.data?.message || 'Generation failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUpgrade = async () => {
    try {
      const response = await api.post('/subscription/checkout', { planId: 'pro' });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      addToast('Failed to start checkout', 'error');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.email?.split('@')[0]}</h1>
              <p className="text-gray-400 mt-1">Create amazing content with AI</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass px-4 py-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent-cyan" />
                <span className="font-semibold">{user?.tokenBalance || 0}</span>
                <span className="text-gray-400 text-sm">tokens</span>
              </div>
              {user?.status !== 'free' && (
                <div className="glass px-4 py-2 flex items-center gap-2 border-accent-primary/50">
                  <Crown className="w-4 h-4 text-accent-primary" />
                  <span className="text-accent-primary font-medium capitalize">{user?.status}</span>
                </div>
              )}
              <Link to="/pricing" className="btn-secondary text-sm">
                {user?.status === 'free' ? 'Upgrade' : 'Manage'}
              </Link>
              <button onClick={logout} className="p-2 glass rounded-xl hover:bg-white/10 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Generations', value: user?.totalGenerations || 0, icon: <Sparkles className="w-5 h-5" /> },
              { label: 'Tokens Used Today', value: result?.tokensUsed || 0, icon: <Zap className="w-5 h-5" /> },
              { label: 'Current Plan', value: user?.status?.toUpperCase() || 'FREE', icon: <CreditCard className="w-5 h-5" /> },
              { label: 'Next Token Reset', value: '24h', icon: <Clock className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="text-accent-primary">{stat.icon}</div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'playground', label: 'AI Playground', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent-primary text-white'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'playground' ? (
              <motion.div
                key="playground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-3 gap-6"
              >
                {/* Templates */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4">Templates</h3>
                  <div className="space-y-2">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => {
                          if (template.pro && user?.status === 'free') {
                            addToast('This template requires PRO subscription', 'error');
                            return;
                          }
                          setSelectedTemplate(template);
                          setResult(null);
                        }}
                        className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                          selectedTemplate.id === template.id
                            ? 'bg-accent-primary/20 border border-accent-primary/50'
                            : 'hover:bg-white/5 border border-transparent'
                        } ${template.pro && user?.status === 'free' ? 'opacity-50' : ''}`}
                      >
                        <div className={`${template.pro ? 'text-accent-pink' : 'text-accent-primary'}`}>
                          {template.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-sm">{template.name}</p>
                          <p className="text-xs text-gray-500">{template.category}</p>
                        </div>
                        {template.pro && (
                          <span className="px-2 py-0.5 bg-accent-pink/20 text-accent-pink text-xs rounded-full">
                            PRO
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {user?.status === 'free' && (
                    <button
                      onClick={handleUpgrade}
                      className="w-full mt-4 p-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium"
                    >
                      Upgrade to Unlock All
                    </button>
                  )}
                </div>

                {/* Generator */}
                <div className="lg:col-span-2 glass p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Generate with {selectedTemplate.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">AI:</span>
                      <select
                        value={aiProvider}
                        onChange={(e) => setAiProvider(e.target.value)}
                        className="bg-dark-700 border border-dark-500 rounded-lg px-3 py-1 text-sm"
                      >
                        <option value="openai">GPT-4</option>
                        <option value="gemini">Gemini Pro</option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={`Describe what you want to generate with ${selectedTemplate.name}...`}
                    className="input-field min-h-[150px] resize-none mb-4"
                  />

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-400">
                      Estimated cost: ~{selectedTemplate.pro && user?.status === 'free' ? '500' : '300'} tokens
                    </p>
                    {user?.tokenBalance < 300 && (
                      <button
                        onClick={handleUpgrade}
                        className="text-sm text-accent-primary hover:underline"
                      >
                        Need more tokens?
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Content
                      </>
                    )}
                  </button>

                  {/* Result */}
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-dark-700 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-400">
                            Generated • {result.tokensUsed} tokens used
                          </span>
                        </div>
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm font-sans bg-transparent p-0 m-0">
                          {result.text}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Generation History</h3>
                  <button
                    onClick={fetchGenerations}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {loadingGenerations ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-accent-primary" />
                  </div>
                ) : generations.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400">No generations yet. Start creating!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {generations.map((gen) => (
                      <div key={gen._id} className="p-4 bg-dark-700 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full capitalize">
                            {gen.template}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(gen.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2 line-clamp-2">{gen.prompt}</p>
                        <p className="text-xs text-gray-500">{gen.tokensUsed} tokens used</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
