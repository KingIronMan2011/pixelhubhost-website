/*
  # Add Email Translations

  1. Changes
    - Add language support to email_settings table
    - Add translation columns for subject and content
    - Update existing settings with translations
*/

ALTER TABLE email_settings
ADD COLUMN subject_template_en text NOT NULL DEFAULT 'New Trial Server Request - {email}',
ADD COLUMN subject_template_pt text NOT NULL DEFAULT 'Novo Pedido de Servidor Trial - {email}',
ADD COLUMN subject_template_de text NOT NULL DEFAULT 'Neue Testserver-Anfrage - {email}',
ADD COLUMN subject_template_fr text NOT NULL DEFAULT 'Nouvelle Demande de Serveur d''Essai - {email}',
ADD COLUMN welcome_title_en text NOT NULL DEFAULT 'Welcome to PixelHub Host!',
ADD COLUMN welcome_title_pt text NOT NULL DEFAULT 'Bem-vindo ao PixelHub Host!',
ADD COLUMN welcome_title_de text NOT NULL DEFAULT 'Willkommen bei PixelHub Host!',
ADD COLUMN welcome_title_fr text NOT NULL DEFAULT 'Bienvenue sur PixelHub Host!',
ADD COLUMN notice_title_en text NOT NULL DEFAULT 'Important Notice',
ADD COLUMN notice_title_pt text NOT NULL DEFAULT 'Aviso Importante',
ADD COLUMN notice_title_de text NOT NULL DEFAULT 'Wichtiger Hinweis',
ADD COLUMN notice_title_fr text NOT NULL DEFAULT 'Avis Important',
ADD COLUMN notice_text_en text NOT NULL DEFAULT 'It can take up to 24 hours to provide your server.',
ADD COLUMN notice_text_pt text NOT NULL DEFAULT 'Pode levar até 24 horas para disponibilizar seu servidor.',
ADD COLUMN notice_text_de text NOT NULL DEFAULT 'Es kann bis zu 24 Stunden dauern, bis Ihr Server bereitgestellt wird.',
ADD COLUMN notice_text_fr text NOT NULL DEFAULT 'La mise en place de votre serveur peut prendre jusqu''à 24 heures.',
ADD COLUMN credentials_title_en text NOT NULL DEFAULT 'Your Login Credentials',
ADD COLUMN credentials_title_pt text NOT NULL DEFAULT 'Suas Credenciais de Acesso',
ADD COLUMN credentials_title_de text NOT NULL DEFAULT 'Ihre Anmeldedaten',
ADD COLUMN credentials_title_fr text NOT NULL DEFAULT 'Vos Identifiants de Connexion',
ADD COLUMN server_ready_text_en text NOT NULL DEFAULT 'Once your server is ready, you''ll be able to access it through our control panel. We''ll notify you when everything is set up.',
ADD COLUMN server_ready_text_pt text NOT NULL DEFAULT 'Assim que seu servidor estiver pronto, você poderá acessá-lo através do nosso painel de controle. Nós notificaremos você quando tudo estiver configurado.',
ADD COLUMN server_ready_text_de text NOT NULL DEFAULT 'Sobald Ihr Server bereit ist, können Sie über unser Kontrollpanel darauf zugreifen. Wir benachrichtigen Sie, wenn alles eingerichtet ist.',
ADD COLUMN server_ready_text_fr text NOT NULL DEFAULT 'Une fois votre serveur prêt, vous pourrez y accéder via notre panneau de contrôle. Nous vous informerons lorsque tout sera configuré.',
ADD COLUMN support_text_en text NOT NULL DEFAULT 'If you have any questions or need assistance, please don''t hesitate to contact our support team',
ADD COLUMN support_text_pt text NOT NULL DEFAULT 'Se você tiver alguma dúvida ou precisar de ajuda, não hesite em contatar nossa equipe de suporte',
ADD COLUMN support_text_de text NOT NULL DEFAULT 'Bei Fragen oder wenn Sie Hilfe benötigen, kontaktieren Sie bitte unser Support-Team',
ADD COLUMN support_text_fr text NOT NULL DEFAULT 'Si vous avez des questions ou besoin d''aide, n''hésitez pas à contacter notre équipe de support',
ADD COLUMN automated_message_text_en text NOT NULL DEFAULT 'This is an automated message from PixelHub Host. Please do not reply directly to this email.',
ADD COLUMN automated_message_text_pt text NOT NULL DEFAULT 'Esta é uma mensagem automática do PixelHub Host. Por favor, não responda diretamente a este e-mail.',
ADD COLUMN automated_message_text_de text NOT NULL DEFAULT 'Dies ist eine automatische Nachricht von PixelHub Host. Bitte antworten Sie nicht direkt auf diese E-Mail.',
ADD COLUMN automated_message_text_fr text NOT NULL DEFAULT 'Ceci est un message automatique de PixelHub Host. Veuillez ne pas répondre directement à cet e-mail.';