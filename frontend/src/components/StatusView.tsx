import React from 'react';
import Image from 'next/image';
import { Status } from '@/models/status';

interface StatusViewProps {
  status: Status;
}

const StatusView: React.FC<StatusViewProps> = ({ status }) => {
  const renderContent = () => {
    switch (status.type) {
      case 'text':
        return <p className="text-white text-center text-lg p-4">{status.content}</p>;
      case 'video':
        return (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={status.content} type="video/mp4" />
          </video>
        );
      case 'gif':
        return (
          <div className="relative w-full h-full">
            <Image
              src={status.content}
              alt="status gif"
              fill
              className="object-contain"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full aspect-[9/16] bg-black flex items-center justify-center overflow-hidden snap-start">
      {renderContent()}
    </div>
  );
};

export default StatusView;