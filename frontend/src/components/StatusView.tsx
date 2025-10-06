
import React from 'react';
import { Status } from '@/models/status';

interface StatusViewProps {
  status: Status;
}

const StatusView: React.FC<StatusViewProps> = ({ status }) => {
  const renderContent = () => {
    switch (status.type) {
      case 'text':
        return <p>{status.content}</p>;
      case 'video':
        return (
          <video autoPlay loop muted playsInline>
            <source src={status.content} type="video/mp4" />
          </video>
        );
      case 'gif':
        return <img src={status.content} alt="status gif" />;
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default StatusView;
