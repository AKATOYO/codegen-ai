let auth0 = null;

const configureClient = async () => {
  const response = await fetch("/auth_config.json");
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

const logout = () => {
  auth0.logout({ returnTo: window.location.origin });
};

window.onload = async () => {
  await configureClient();

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "inline-block";
  }

  document.getElementById("login").addEventListener("click", login);
  document.getElementById("logout").addEventListener("click", logout);

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }
};
