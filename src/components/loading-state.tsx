import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  fullScreen?: boolean;
  message?: string;
  className?: string;
}

export default function LoadingState({
  fullScreen = false,
  message = "Loading...",
  className = "",
}: LoadingStateProps) {
  const container = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <motion.div
        animate={{
          rotate: 360,
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="text-primary"
      >
        <Loader2 className="h-8 w-8" />
      </motion.div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground font-medium"
        >
          {message}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        {container}
      </div>
    );
  }

  return container;
}
