import React, { ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, log safely to console without rendering raw traces to the UI
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.hash = '#';
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F4F4F1] text-[#121212] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border-2 border-black p-8 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 bg-[#FF3E00]/10 text-[#FF3E00] flex items-center justify-center mx-auto border-2 border-[#FF3E00]/30">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FF3E00] mb-1">
                Application Notice
              </div>
              <h2 className="text-2xl font-black text-[#121212] font-heading">
                Something went wrong
              </h2>
              <p className="text-xs text-[#666666] mt-2 leading-relaxed font-medium">
                An unexpected interface issue occurred. You can safely reload the page or return to the main gaming portal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 bg-[#121212] hover:bg-[#FF3E00] text-white font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 py-3 bg-[#F4F4F1] hover:bg-[#EAEAE6] text-[#121212] border border-black/20 font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-[#FF3E00]" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
