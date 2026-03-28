import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default_secret_key_32_chars_min!!'; // Must be 32 chars
const IV_LENGTH = 16; 

/**
 * Encrypts a plain text string using AES-256-CBC.
 * Returns the IV and encrypted text joined by a colon.
 */
export function encrypt(text: string): string {
  if (!text) return '';
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY.padEnd(32).slice(0, 32)), iv);
  
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypts an encrypted string (IV:EncryptedText) using AES-256-CBC.
 */
export function decrypt(text: string): string {
  if (!text || !text.includes(':')) return '';
  
  try {
    const textParts = text.split(':');
    const ivValue = textParts.shift();
    if (!ivValue) return '';
    
    const iv = Buffer.from(ivValue, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY.padEnd(32).slice(0, 32)), iv);
    
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted.toString();
  } catch (error) {
    console.error('Decryption failed:', error);
    return '';
  }
}
