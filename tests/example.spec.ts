import { test, expect, type Page } from '@playwright/test';

const EMAIL = 'lucasvieiraandrade58@gmail.com';
const PASSWORD = '12345678';

const TENANT_NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', heading: 'Dashboard' },
  { label: 'Templates', path: '/templates', heading: 'Templates' },
  { label: 'Links públicos', path: '/links-publicos', heading: 'Links para enviar' },
  { label: 'Envios', path: '/envios', heading: 'Envios de documento' },
  { label: 'Protocolos', path: '/protocolos', heading: 'Protocolos' },
  { label: 'Pessoas', path: '/pessoas', heading: 'Pessoas' },
  { label: 'Notificações', path: '/notificacoes', heading: 'Notificações' },
  { label: 'Empresa', path: '/clinica/configuracoes', heading: 'Configurações' },
  { label: 'Link Bio', path: '/link-bio', heading: 'Link Bio' },
  { label: 'Integrações', path: '/clinica/integracoes', heading: 'Integrações' },
  { label: 'Usuários', path: '/usuarios', heading: 'Usuários' },
  { label: 'Permissões', path: '/organizacao/permissoes', heading: 'Permissões' },
] as const;

const PLATFORM_NAV_ITEMS = [
  { label: 'Visão geral', path: '/plataforma', heading: 'Visão geral' },
  { label: 'Clientes (tenants)', path: '/plataforma/clientes', heading: 'Clientes (tenants)' },
  { label: 'Leads', path: '/plataforma/leads', heading: 'Leads' },
  { label: 'Assinaturas', path: '/plataforma/assinaturas', heading: 'Assinaturas' },
  { label: 'Faturas / cobranças', path: '/plataforma/faturas', heading: 'Faturas / cobranças' },
  { label: 'Notificações', path: '/plataforma/notificacoes', heading: 'Notificações' },
  { label: 'Planos', path: '/plataforma/planos', heading: 'Planos' },
  { label: 'Configurações', path: '/plataforma/configuracoes', heading: 'Configurações da plataforma' },
  { label: 'Logs', path: '/plataforma/logs', heading: 'Meus logs de auditoria' },
] as const;

async function login(page: Page) {
  await page.goto('/autenticacao');
  await page.getByRole('textbox', { name: 'E-mail' }).fill(EMAIL);
  await page.locator('#login-password').fill(PASSWORD);
  await page.getByRole('button', { name: /Acessar/i }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
}

async function expectAuthenticatedShell(page: Page, heading: string) {
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('header h2')).toHaveText(heading);
  await expect(page.locator('app-erro-404')).toHaveCount(0);
}

test.describe('Fluxos públicos', () => {
  test('deve navegar entre home, login e páginas institucionais', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Gestgo/i);
    await expect(page.getByRole('link', { name: 'Entrar' })).toBeVisible();

    await page.getByRole('link', { name: 'Entrar' }).click();
    await expect(page).toHaveURL(/\/autenticacao$/);
    await expect(page.getByRole('heading', { name: 'Bem-vindo de volta' })).toBeVisible();

    await page.getByRole('link', { name: 'Esqueceu a senha?' }).click();
    await expect(page).toHaveURL(/\/esqueci-a-senha$/);

    await page.goto('/comece');
    await expect(page.locator('.comece-page .nav-login')).toBeVisible();

    await page.goto('/privacidade');
    await expect(page).toHaveURL(/\/privacidade$/);
    await expect(page.getByRole('link', { name: 'Voltar ao início' })).toBeVisible();

    await page.goto('/termos-de-uso');
    await expect(page).toHaveURL(/\/termos-de-uso$/);
    await expect(page.getByRole('link', { name: 'Voltar ao início' })).toBeVisible();
  });

  test('deve proteger rotas autenticadas para usuários sem sessão', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/autenticacao$/);
    await expect(page.getByRole('heading', { name: 'Bem-vindo de volta' })).toBeVisible();
  });
});

test.describe('Sessão autenticada', () => {
  test('deve validar os principais fluxos autenticados da aplicação', async ({ page }) => {
    await login(page);

    await page.getByRole('button', { name: 'Menu do usuário' }).click();
    await expect(page.locator('.user-dropdown').getByRole('button', { name: /Sair/ })).toBeVisible();

    const billingLink = page.getByRole('link', { name: 'Assinatura' });
    if (await billingLink.isVisible()) {
      await billingLink.click();
      await expect(page).toHaveURL(/\/assinatura$/);
      await expectAuthenticatedShell(page, 'Assinatura');
    } else {
      await page.getByRole('button', { name: 'Menu do usuário' }).click();
    }

    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'Tema e aparência' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.getByRole('button', { name: 'Escuro' }).click();
    await expect(page.getByRole('button', { name: 'Escuro' })).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('button', { name: /Cor do tema:/ }).first().click();
    await expect(page.getByText('Selecionado:', { exact: false })).toBeVisible();

    await page.getByRole('button', { name: 'Fechar painel de tema' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);

    for (const item of TENANT_NAV_ITEMS) {
      await page.goto(item.path);
      await expect(page).toHaveURL(new RegExp(`${item.path.replace(/\//g, '\\/')}$`));
      await expectAuthenticatedShell(page, item.heading);
    }

    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'Menu do usuário' }).click();

    const adminPlatformLink = page.getByRole('link', { name: 'Admin da plataforma' });
    if (await adminPlatformLink.isVisible()) {
      await adminPlatformLink.click();
      await expect(page).toHaveURL(/\/plataforma$/);

      for (const item of PLATFORM_NAV_ITEMS) {
        await page.goto(item.path);
        await expect(page).toHaveURL(new RegExp(`${item.path.replace(/\//g, '\\/')}$`));
        await expectAuthenticatedShell(page, item.heading);
      }
    }

    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'Menu do usuário' }).click();
    await page.locator('.user-dropdown').getByRole('button', { name: /Sair/ }).click();
    await expect(page).toHaveURL(/\/autenticacao$/);
    await expect(page.getByRole('heading', { name: 'Bem-vindo de volta' })).toBeVisible();
  });
});
