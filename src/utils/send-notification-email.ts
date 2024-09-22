import axios from 'axios';

interface EmailConfig {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail({ to, subject, body }: EmailConfig): Promise<void> {
  try {
    const emailData = {
      to,
      subject,
      body,
      key: 'Angola2020*',  // Chave de autenticação da API
    };

    const response = await axios.post('https://api.reputacao360.online/api/enviar-email', emailData);

    if (response.status === 200) {
      console.log('E-mail enviado com sucesso');
    } else {
      console.error('Erro ao enviar o e-mail:', response.data);
    }
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}
