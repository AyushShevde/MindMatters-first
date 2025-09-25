import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface RatingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  onSkip: () => void;
}

export function RatingPopup({ isOpen, onClose, onSubmit, onSkip }: RatingPopupProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setRating(0);
        setHoveredRating(0);
      }, 1500);
    }
  };

  const handleSkip = () => {
    onSkip();
    onClose();
    setRating(0);
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || rating;
  const showSubmitButton = rating > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {t('rating.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          {/* Rating Stars */}
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                disabled={isSubmitted}
              >
                <Star
                  className={`h-12 w-12 transition-colors duration-200 ${
                    star <= displayRating
                      ? 'text-yellow-400 fill-yellow-400 drop-shadow-lg'
                      : 'text-gray-300 fill-gray-300'
                  } ${
                    isSubmitted ? 'opacity-50' : 'hover:text-yellow-300 hover:fill-yellow-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Rating Display */}
          {displayRating > 0 && (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {displayRating.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('rating.outOf')} 5.0
              </div>
            </div>
          )}

          {/* Success Message */}
          {isSubmitted && (
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600 mb-2">
                {t('rating.thankYou')}
              </div>
              <div className="text-sm text-muted-foreground">
                {t('rating.feedbackReceived')}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {showSubmitButton && !isSubmitted && (
            <div className="w-full">
              <Button
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                size="lg"
              >
                {t('rating.submit')}
              </Button>
            </div>
          )}

          {/* Instructions */}
          {!showSubmitButton && !isSubmitted && (
            <div className="text-center text-sm text-muted-foreground">
              {t('rating.instructions')}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RatingPopup;
