import { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const location = useLocation();
  const isSignup = location.pathname === '/signup';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles configuration
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      connections: number[];
    }> = [];

    const PARTICLE_COUNT = 50;
    const CONNECTION_DISTANCE = 150;
    const PARTICLE_SIZE = 2;

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * PARTICLE_SIZE + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }

    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
        ctx.fill();

        // Connect particles
        particles.forEach((otherParticle, j) => {
          if (i === j) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = 1 - (distance / CONNECTION_DISTANCE);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
        style={{ filter: 'blur(3px)' }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30" />

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-30"
            style={{
              background: `radial-gradient(circle, ${
                ['#4F46E5', '#7C3AED', '#2563EB'][i]
              } 0%, transparent 70%)`,
              width: `${Math.random() * 600 + 400}px`,
              height: `${Math.random() * 600 + 400}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative min-h-screen ${isSignup ? 'flex justify-center' : 'grid md:grid-cols-2'}`}>
        {/* Auth Form Side */}
        <div className="flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white">CRM SaaS</h2>
              <p className="mt-2 text-gray-300">Next-generation business management</p>
            </div>
            {children}
          </motion.div>
        </div>

        {/* Features Side - Only show on login */}
        {!isSignup && (
          <div className="hidden md:flex items-center justify-center p-8">
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <h2 className="text-4xl font-bold text-white">Transform Your Business with Our CRM</h2>
                
                {[
                  {
                    title: "Smart Automation",
                    description: "Automate repetitive tasks and focus on what matters most",
                    icon: "⚡"
                  },
                  {
                    title: "Insightful Analytics",
                    description: "Make data-driven decisions with powerful analytics tools",
                    icon: "📊"
                  },
                  {
                    title: "Team Collaboration",
                    description: "Work seamlessly with your team in real-time",
                    icon: "👥"
                  },
                  {
                    title: "Customer Insights",
                    description: "Understand your customers better with AI-powered insights",
                    icon: "🎯"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="mt-1 text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}