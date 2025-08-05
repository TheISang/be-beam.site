import { setupWorker } from 'msw/browser';
import meetingHandlers from './handlers/meetingsHandlers';
import guidBookHandlers from './handlers/guidBooksHandler';
import usersHandlers from './handlers/usersHandler';
import homeHandlers from './handlers/homeHandler';
import hostsHandlers from './handlers/hostsHandler';

export const worker = setupWorker(
  ...meetingHandlers,
  ...guidBookHandlers,
  ...usersHandlers,
  ...homeHandlers,
  ...hostsHandlers,
);
