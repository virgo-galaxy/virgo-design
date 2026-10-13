import { createContext, useContext } from 'react';
export const WorkflowRevisionContext = createContext(0);
export const useWorkflowRevision = () => useContext(WorkflowRevisionContext);
