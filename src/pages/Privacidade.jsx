const Privacidade = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl text-foreground">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>

      <p className="text-muted-foreground mb-6">
        Sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos,
        usamos, armazenamos e protegemos suas informações em nosso site e serviços. Ao utilizar o
        site da H.A Imoveis Conceito, você concorda com os termos descritos abaixo.
      </p>

      <h2 className="text-xl font-semibold mb-3">1. Coleta de Informações</h2>
      <p className="text-muted-foreground mb-6">
        Coletamos informações pessoais fornecidas voluntariamente por você, como nome, e-mail,
        telefone e dados de contato. Também podemos coletar dados de navegação automaticamente,
        como endereço IP, tipo de dispositivo, navegador e páginas acessadas.
      </p>

      <h2 className="text-xl font-semibold mb-3">2. Uso das Informações</h2>
      <p className="text-muted-foreground mb-6">
        As informações coletadas são utilizadas para:
      </p>

      <ul className="list-disc ml-6 text-muted-foreground mb-6 space-y-2">
        <li>Entrar em contato sobre imóveis de interesse;</li>
        <li>Enviar informações sobre serviços, promoções e novidades;</li>
        <li>Melhorar sua experiência no site;</li>
        <li>Realizar análises e métricas internas;</li>
        <li>Cumprir obrigações legais.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">3. Compartilhamento de Informações</h2>
      <p className="text-muted-foreground mb-6">
        Suas informações não são vendidas ou compartilhadas com terceiros, exceto quando necessário
        para a prestação de serviços (como empresas de hospedagem ou plataformas de envio de e-mail),
        ou quando exigido por lei.
      </p>

      <h2 className="text-xl font-semibold mb-3">4. Cookies e Tecnologias de Rastreamento</h2>
      <p className="text-muted-foreground mb-6">
        Utilizamos cookies para melhorar a sua experiência, lembrar suas preferências, entender como
        você navega no site e otimizar o desempenho. Você pode gerenciar as permissões de cookies
        diretamente no seu navegador.
      </p>

      <h2 className="text-xl font-semibold mb-3">5. Segurança</h2>
      <p className="text-muted-foreground mb-6">
        Adotamos medidas de segurança técnicas e administrativas para proteger seus dados contra
        acessos não autorizados, vazamentos ou qualquer forma de uso indevido.
      </p>

      <h2 className="text-xl font-semibold mb-3">6. Seus Direitos</h2>
      <p className="text-muted-foreground mb-6">
        Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
      </p>

      <ul className="list-disc ml-6 text-muted-foreground mb-6 space-y-2">
        <li>Acessar suas informações pessoais;</li>
        <li>Solicitar correção de dados incompletos ou desatualizados;</li>
        <li>Solicitar exclusão de dados pessoais;</li>
        <li>Revogar consentimento;</li>
        <li>Solicitar informações sobre como seus dados são utilizados.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">7. Contato</h2>
      <p className="text-muted-foreground mb-6">
        Caso deseje exercer seus direitos, tirar dúvidas ou solicitar mais informações, entre em
        contato através de:
      </p>

      <p className="text-muted-foreground mb-2"><strong>E-mail:</strong> contato@haimobiliaria.com.br</p>
      <p className="text-muted-foreground mb-6"><strong>Telefone:</strong> (85) 98112-7529</p>

      <h2 className="text-xl font-semibold mb-3">8. Atualizações desta Política</h2>
      <p className="text-muted-foreground mb-6">
        Podemos atualizar esta Política periodicamente para refletir alterações em nossos processos
        ou por exigências legais. Recomendamos que visite esta página regularmente.
      </p>

      <p className="text-muted-foreground text-sm mt-10">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>
    </div>
  );
};

export default Privacidade;
