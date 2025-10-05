import React from "react";
import CircularGalleryInner from "./CircularBlock";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface CircularGalleryProps {
  onClose: () => void;
  isOpen: boolean;
  items?: { image: string; text: string }[];
}

const CircularGallery: React.FC<CircularGalleryProps> = ({ onClose, isOpen, items }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Background overlay (yp) */}
       <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-md" />

      {/* Centered modal container (yp) */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-transparent rounded-xl shadow-lg w-full min-h-screen p-6">
          {/* gallery modal (yp) */}
          <div style={{  position: "relative" }} className="w-full">
            <CircularGalleryInner
              bend={3}
              textColor="#ffffff"
              borderRadius={0.10}
              scrollEase={0.02}
              items={items}
            />
          </div>

          {/* Close button (yp) */}
          <button
            onClick={onClose}
            className="mb-32 px-4 py-2 bg-red-500 text-white cursor-pointer rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CircularGallery;
