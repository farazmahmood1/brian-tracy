import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Small delay to not overwhelm the user immediately on load
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleConsent = (type: 'all' | 'necessary' | 'reject') => {
        localStorage.setItem('cookie-consent', type);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed bottom-6 left-6 z-[100] w-[90vw] md:w-[500px] bg-background/80 backdrop-blur-xl border border-muted-foreground p-8 rounded-2xl shadow-2xl"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-foreground/5 rounded-xl border border-muted-foreground">
                                <Cookie className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold tracking-tight">Cookie Preferences</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">Manage your privacy settings</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors hover:bg-foreground/5 rounded-lg"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <p className="text-[15px] text-muted-foreground mb-8 leading-relaxed">
                        We value your privacy. We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                        By clicking "Accept All", you consent to our use of cookies.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={() => handleConsent('reject')}
                            className="flex-1 order-2 sm:order-1 h-11 border-muted-foreground hover:bg-foreground/5"
                        >
                            Reject All
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleConsent('necessary')}
                            className="flex-1 order-3 sm:order-2 h-11 border-muted-foreground hover:bg-foreground/5"
                        >
                            Necessary Only
                        </Button>
                        <Button
                            onClick={() => handleConsent('all')}
                            className="flex-[1.5] order-1 sm:order-3 h-11 font-medium bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-foreground/5"
                        >
                            Accept All
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
