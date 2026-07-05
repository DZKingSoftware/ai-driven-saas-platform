
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../lib/api';
import { useState } from 'react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    tokens: 100,
    description: 'Perfect for individuals and small projects',
    features: [
      '100 tokens per month',
      'Basic AI templates',
      'Email support',
      '1 user',
      'Standard generation speed',
    ],
    icon: <Sparkles className="w-6 h-6" />,
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    tokens: 500,
    description: 'Best for growing teams and businesses',
    features: [
      '500 tokens per month',
      'All AI templates',
      'Priority support',
      '5 users',
      'Fast generation speed',
      'API access',
      'Advanced analytics',
    ],
    icon: <Zap className="w-6 h-6" />,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    tokens: 2000,
    description: 'For large organizations with custom needs',
    features: [
      '2000 tokens per month',
      'Custom templates',
      'Dedicated support',
      'Unlimited users',
      'Instant generation speed',
      'API access',
      'Advanced analytics',
      'Team collaboration',
      'White-label option',
      'Custom integrations',
    ],
    icon: <Crown className="w-6 h-6" />,
    popular: false,
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(null);

  const handleSubscribe = async (planId) => {
    if (!user) {
      addToast('Please login to subscribe', 'info');
      return;
    }

    setLoading(planId);
    try {
      const response = await api.post('/subscription/checkout', { planId });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to create checkout session', 'error');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Layout>
      <section className="min-h-screen py-32 relative">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/10 rounded-full blur-[200px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Start free, upgrade anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'md:-mt-8 md:-mb-8' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className={`glass h-full p-8 rounded-3xl transition-all duration-300 hover:border-accent-primary/50 ${plan.popular ? 'border-accent-primary glow' : ''}`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.popular ? 'bg-gradient-to-br from-accent-primary to-accent-secondary' : 'bg-dark-600'}`}>
                    <div className={plan.popular ? 'text-white' : 'text-accent-primary'}>
                      {plan.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  
                  <div className="text-sm text-accent-cyan mb-6">
                    {plan.tokens} tokens included
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'btn-primary'
                        : 'btn-secondary hover:border-accent-primary'
                    } disabled:opacity-50`}
                  >
                    {loading === plan.id ? 'Processing...' : user?.status === plan.id ? 'Current Plan' : 'Get Started'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="glass p-8 rounded-2xl max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Free Tier Available</h3>
              <p className="text-gray-400 mb-6">
                Start with 10 free tokens every 24 hours. No credit card required.
              </p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                Start for Free
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-xl font-semibold text-center mb-8">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  q: 'What are tokens?',
                  a: 'Tokens are credits used for AI content generation. Each generation uses a certain number of tokens based on complexity.',
                },
                {
                  q: 'Can I change plans?',
                  a: 'Yes, you can upgrade or downgrade anytime. Changes take effect on your next billing cycle.',
                },
                {
                  q: 'What happens to unused tokens?',
                  a: 'Tokens reset monthly on your billing date. Upgrade to keep generating.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 7-day money-back guarantee. Contact support within 7 days for a full refund.',
                },
              ].map((faq, i) => (
                <div key={i} className="glass p-6 rounded-xl">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
