import { useState, createContext, useContext, ReactNode } from 'react';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div data-ev-id="ev_2c19151bae" className={className}>{children}</div>
    </TabsContext.Provider>);

}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div data-ev-id="ev_b46b864bce" className={`inline-flex p-1 bg-muted rounded-lg gap-1 ${className}`}>
      {children}
    </div>);

}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.activeTab === value;

  return (
    <button data-ev-id="ev_d5296b06f7"
    onClick={() => context.setActiveTab(value)}
    className={`
        px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
        ${isActive ?
    'bg-surface text-foreground shadow-sm' :
    'text-muted-foreground hover:text-foreground'}
        ${
    className}
      `}>

      {children}
    </button>);

}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return <div data-ev-id="ev_20d1c8b141" className={`animate-fade-in ${className}`}>{children}</div>;
}