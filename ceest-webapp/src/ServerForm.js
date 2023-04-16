import { useState } from 'react';

function ServerForm() {
  const [domainName, setDomainName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const servers = JSON.parse(localStorage.getItem('servers') || '[]');
    servers.push(domainName);
    localStorage.setItem('servers', JSON.stringify(servers));
    setDomainName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Server domain name:
        <input type="text" value={domainName} onChange={(e) => setDomainName(e.target.value)} />
      </label>
      <button type="submit">Add Server</button>
    </form>
  );
}

export default ServerForm;