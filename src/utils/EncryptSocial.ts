/** @format */

import crypto from 'crypto';

class EncryptSocial {
  private algorithm: string;
  private secretKey: Buffer;

  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.secretKey = Buffer.from(
      '24923098f453ded658780ffa90ec8424c2490303f2b4d702fad28225763b876f',
      'hex'
    );
  }

  // Function to encrypt SSN
  encrypt(text: string): string {
    const iv = crypto.randomBytes(16); // Generate a random iv for each encryption
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    // Return the IV and encrypted text concatenated (as hex strings)
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  // Function to decrypt SSN
  decrypt(encryptedText: string): string {
    if (!encryptedText) return ''; // Handle null or empty values
    const [ivHex, encryptedHex] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      iv
    );
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}

export default EncryptSocial;
