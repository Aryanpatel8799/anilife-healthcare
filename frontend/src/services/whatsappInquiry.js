
const WHATSAPP_CONFIG = {
  phoneNumber: '+919327320094', // AniLife Healthcare WhatsApp number
  businessName: 'AniLife Healthcare'
};

export const whatsappInquiry = {
  // Send general inquiry to WhatsApp
  sendInquiry: (formData) => {
    const { name, email, phone, subject, message } = formData;
    
    const whatsappMessage = `*New Inquiry - ${WHATSAPP_CONFIG.businessName}*

Customer Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

Sent from AniLife Healthcare Website`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    return {
      success: true,
      message: 'Redirecting to WhatsApp...'
    };
  },

  // Send product inquiry to WhatsApp
  sendProductInquiry: (productData, customerData = {}) => {
    const { name = '', email = '', phone = '', message = '' } = customerData;
    
    const whatsappMessage = `*Product Inquiry - ${WHATSAPP_CONFIG.businessName}*

Product Details:
Product: ${productData.name}
Category: ${productData.category || 'Healthcare'}
${productData.price ? `Price: ₹${productData.price.toLocaleString()}` : ''}

Customer Details:
Name: ${name || 'Not provided'}
Email: ${email || 'Not provided'}
Phone: ${phone || 'Not provided'}

Inquiry Message:
${message || 'Customer is interested in this product. Please provide more details and pricing information.'}

Sent from AniLife Healthcare Website`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    return {
      success: true,
      message: 'Redirecting to WhatsApp...'
    };
  },

  // Send bulk/wholesale inquiry
  sendBulkInquiry: (products, customerData) => {
    const { name, email, phone, company = '', message = '' } = customerData;
    
    const productsList = products.map(product => 
      `• ${product.name} ${product.quantity ? `(Qty: ${product.quantity})` : ''}`
    ).join('\n');

    const whatsappMessage = `Bulk Order Inquiry - ${WHATSAPP_CONFIG.businessName}

Customer Details:
Name: ${name}
Company: ${company || 'Individual'}
Email: ${email}
Phone: ${phone}

Products of Interest:
${productsList}

*Additional Message:*
${message || 'Please provide bulk pricing and availability for the above products.'}

---
_Sent from AniLife Healthcare Website_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    return {
      success: true,
      message: 'Redirecting to WhatsApp...'
    };
  },

  // Quick WhatsApp contact
  quickContact: (message = '') => {
    const defaultMessage = message || `Hi ${WHATSAPP_CONFIG.businessName}! I'm interested in your animal healthcare products. Could you please provide more information?`;
    
    const whatsappMessage = `Quick Contact - ${WHATSAPP_CONFIG.businessName}*

${defaultMessage}

Sent from AniLife Healthcare Website`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    return {
      success: true,
      message: 'Redirecting to WhatsApp...'
    };
  }
};

export default whatsappInquiry;
