import { Toaster as ToasterComponent, ToastBar } from 'react-hot-toast';

export const Toaster = () => {
  return (
    <ToasterComponent
      toastOptions={{
        duration: 10000,
        success: {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              fill="none"
            >
              <path
                fill="#00AE4F"
                fillRule="evenodd"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm4.119-10.381L14.88 9.38l-3.546 3.546-1.716-1.716-1.238 1.237 2.954 2.954 4.784-4.783Z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
        error: {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              fill="none"
            >
              <path
                fill="#FF4D4C"
                fillRule="evenodd"
                d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9Zm-9-4.5a.9.9 0 0 1 .9.9v4.5a.9.9 0 1 1-1.8 0V8.4a.9.9 0 0 1 .9-.9Zm-.9 8.1a.9.9 0 0 1 .9-.9h.007a.9.9 0 1 1 0 1.8H12a.9.9 0 0 1-.9-.9Z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            padding: 0,
            margin: 0,
            overflow: 'hidden',
            borderRadius: '10px',
            backgroundColor: '#353535',
            maxWidth: '250px',
          }}
        >
          {({ icon, message }) => (
            <div className="flex items-center bg-gray-800 px-4 py-3 text-b2 text-white">
              {icon}
              {message}
            </div>
          )}
        </ToastBar>
      )}
    </ToasterComponent>
  );
};
