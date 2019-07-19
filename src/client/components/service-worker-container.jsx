import * as React from 'react';

const ServiceWorkerContext = React.createContext(null);

export const ServiceWorkerContainer = ({ registerServiceWorker, children }) => {
  const [serviceWorkerProps, setServiceWorkerProps] = React.useState(null);

  React.useEffect(() => {
    registerServiceWorker(refresh => {
      setServiceWorkerProps({
        refresh: () => {
          refresh();
          setServiceWorkerProps(null);
        },
        ignore: () => setServiceWorkerProps(null)
      });
    });
  }, []);

  return (
    <ServiceWorkerContext.Provider value={serviceWorkerProps}>
      { children }
    </ServiceWorkerContext.Provider>
  );
};

export function withRefresh(RefreshComponent, DefaultComponent) {
  DefaultComponent = DefaultComponent || (() => <></>);
  return (props) => (
    <ServiceWorkerContext.Consumer>
      { value => value 
        ? <RefreshComponent {...value} {...props} />
        : <DefaultComponent {...props} />
      }
    </ServiceWorkerContext.Consumer>
  );
}
