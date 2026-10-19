export const ADMIN_WHATSAPP_NUMBER = '9557323216';
export const ADMIN_PHONE_NUMBER = '9557323216';

export interface WhatsAppInquiryPayload {
  clientName: string;
  phone: string;
  email?: string;
  companyName?: string;
  division?: string;
  serviceTitle?: string;
  plotLengthFeet?: number;
  plotWidthFeet?: number;
  shedHeightFeet?: number;
  totalAreaSqFt?: number;
  estimatedBudget?: number;
  location?: string;
  requirements?: string;
}

export function formatInquiryWhatsAppMessage(data: WhatsAppInquiryPayload): string {
  const divisionLabel =
    data.division === 'interior_solution'
      ? 'Services List (Complete Interior Solution)'
      : 'Welding Work Services (Industrial Factory Tin Shed)';

  const lines: string[] = [
    '🏗️ *NEW INQUIRY - ROYALPRO INDUSTRIAL*',
    '━━━━━━━━━━━━━━━━━━━━━━━━━',
    `👤 *Client Name:* ${data.clientName || 'N/A'}`,
    `📞 *Mobile Phone:* ${data.phone || 'N/A'}`,
  ];

  if (data.email) {
    lines.push(`📧 *Email:* ${data.email}`);
  }

  if (data.companyName) {
    lines.push(`🏢 *Company / Firm:* ${data.companyName}`);
  }

  if (data.location) {
    lines.push(`📍 *Site Location / City:* ${data.location}`);
  }

  lines.push(`🛠️ *Category:* ${divisionLabel}`);

  if (data.serviceTitle) {
    lines.push(`📋 *Service Requested:* ${data.serviceTitle}`);
  }

  if (data.plotLengthFeet && data.plotWidthFeet) {
    const heightStr = data.shedHeightFeet ? ` x ${data.shedHeightFeet} ft height` : '';
    const areaStr = data.totalAreaSqFt
      ? `${data.totalAreaSqFt} sq.ft.`
      : `${data.plotLengthFeet * data.plotWidthFeet} sq.ft.`;
    lines.push(`📐 *Dimensions:* ${data.plotLengthFeet} ft x ${data.plotWidthFeet} ft${heightStr} (~${areaStr})`);
  } else if (data.totalAreaSqFt) {
    lines.push(`📐 *Total Area:* ${data.totalAreaSqFt} sq.ft.`);
  }

  if (data.estimatedBudget) {
    lines.push(`💰 *Estimated Budget:* ₹${Number(data.estimatedBudget).toLocaleString('en-IN')}`);
  }

  if (data.requirements) {
    lines.push(`📝 *Requirements / Message:* ${data.requirements}`);
  }

  const now = new Date();
  const timeStr = now.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  lines.push(`⏰ *Submitted At:* ${timeStr}`);
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('🌐 *Source:* Royalpro Official Website');
  lines.push(`📲 Direct Helpline: ${ADMIN_PHONE_NUMBER}`);

  return lines.join('\n');
}

export function getWhatsAppUrl(message: string, rawPhone: string = ADMIN_WHATSAPP_NUMBER): string {
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '').slice(-10);
  const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  return `https://api.whatsapp.com/send?phone=${fullPhone}&text=${encodeURIComponent(message)}`;
}

export function openWhatsAppLink(message: string, rawPhone: string = ADMIN_WHATSAPP_NUMBER): void {
  const url = getWhatsAppUrl(message, rawPhone);
  if (typeof window !== 'undefined') {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) {
      // Fallback if popup blocker intercepted
      window.location.href = url;
    }
  }
}
