import { Button, Center, Text, Notification,Input } from '@mantine/core';
import { useState , useEffect} from 'react';
// import { IconCheck, IconX } from '@tabler/icons-react';

function ServerForm() {
  const [domainName, setDomainName] = useState('');
  const [notification,setNotification] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const servers = JSON.parse(localStorage.getItem('servers') || '[]');
    servers.push(domainName);
    localStorage.setItem('servers', JSON.stringify(servers));
    setDomainName('');
    setNotification('Refresh List Now');
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <Center>
            <Text sx={{ display: 'block' }} weight={800}>
              {/* CEEST - Cost Based Energy Efficient Scheduling And Cloud Computing{' '} */}
            </Text>
          </Center>
          <Input
            placeholder="Enter Domain Name of Server"
            type="text"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            size="xs"
            radius="md"
          />     
        </label>
        <Button compact m="md" type="submit">
          Add Server
        </Button>
      </form>

      {notification && (
        <Notification
          title="Server added Successfully"
          onClose={() => setNotification('')}
          autoClose
          autoCloseTimeout={10000}
          sx={{
            position : 'fixed',
            top : '40px',
            right : '40px'
          }}
        >
          {notification}
        </Notification>
      )}

    </>
  );
}

export default ServerForm;