export interface Status {
  id: string;
  vendor_id: string;
  type: 'text' | 'video' | 'gif';
  content: string;
  timestamp: string;
}