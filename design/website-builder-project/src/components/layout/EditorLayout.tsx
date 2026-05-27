import { ReactNode, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ChevronLeft,
  Undo2,
  Redo2,
  Eye,
  Save,
  Rocket,
  Monitor,
  Tablet,
  Smartphone,
  Settings,
  MoreVertical,
  Check,
  Loader2 } from
'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown';

interface EditorLayoutProps {
  leftSidebar: ReactNode;
  rightSidebar: ReactNode;
  children: ReactNode;
  onSave?: () => void;
  onPublish?: () => void;
  onPreview?: () => void;
  isSaving?: boolean;
  lastSaved?: string;
  websiteName?: string;
}

type Device = 'desktop' | 'tablet' | 'mobile';

export function EditorLayout({
  leftSidebar,
  rightSidebar,
  children,
  onSave,
  onPublish,
  onPreview,
  isSaving = false,
  lastSaved,
  websiteName = 'Untitled Website'
}: EditorLayoutProps) {
  const navigate = useNavigate();
  const [device, setDevice] = useState<Device>('desktop');
  const [canUndo] = useState(true);
  const [canRedo] = useState(false);

  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <div data-ev-id="ev_1f5bfe24dc" className="h-screen flex flex-col bg-background-tertiary">
      {/* Top Bar */}
      <header data-ev-id="ev_1ef52fb1ac" className="h-14 bg-surface border-b border-border px-4 flex items-center justify-between gap-4 flex-shrink-0">
        {/* Left Section */}
        <div data-ev-id="ev_16f0ec98ba" className="flex items-center gap-3">
          <Tooltip content="Back to dashboard">
            <button data-ev-id="ev_650567d9dc"
            onClick={() => navigate('/websites')}
            className="p-2 rounded-lg hover:bg-muted transition-colors">

              <ChevronLeft className="w-5 h-5 text-foreground-secondary" />
            </button>
          </Tooltip>
          <div data-ev-id="ev_22b9b84f54" className="h-6 w-px bg-border" />
          <input data-ev-id="ev_8ba7a20b0b"
          type="text"
          defaultValue={websiteName}
          className="bg-transparent text-foreground font-medium text-sm border-none outline-none focus:ring-0 max-w-[200px]" />

        </div>

        {/* Center Section - Device Switcher */}
        <div data-ev-id="ev_dfa4d79e4d" className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          {[
          { id: 'desktop' as Device, icon: Monitor },
          { id: 'tablet' as Device, icon: Tablet },
          { id: 'mobile' as Device, icon: Smartphone }].
          map(({ id, icon: Icon }) =>
          <Tooltip key={id} content={id.charAt(0).toUpperCase() + id.slice(1)}>
              <button data-ev-id="ev_320a980201"
            onClick={() => setDevice(id)}
            className={`
                  p-2 rounded-md transition-all
                  ${device === id ?
            'bg-surface text-foreground shadow-sm' :
            'text-muted-foreground hover:text-foreground'}
                `
            }>

                <Icon className="w-4 h-4" />
              </button>
            </Tooltip>
          )}
        </div>

        {/* Right Section */}
        <div data-ev-id="ev_cf0a6b74e9" className="flex items-center gap-2">
          {/* Autosave indicator */}
          <div data-ev-id="ev_c9f5e9c75b" className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
            {isSaving ?
            <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span data-ev-id="ev_3e1a2c812e">Saving...</span>
              </> :
            lastSaved ?
            <>
                <Check className="w-4 h-4 text-success" />
                <span data-ev-id="ev_202c2c8da2">Saved {lastSaved}</span>
              </> :
            null}
          </div>

          {/* Undo/Redo */}
          <div data-ev-id="ev_9b2fedfb0f" className="flex items-center gap-1">
            <Tooltip content="Undo (Ctrl+Z)">
              <button data-ev-id="ev_16a419d465"
              disabled={!canUndo}
              className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50">

                <Undo2 className="w-4 h-4 text-foreground-secondary" />
              </button>
            </Tooltip>
            <Tooltip content="Redo (Ctrl+Y)">
              <button data-ev-id="ev_85c7873236"
              disabled={!canRedo}
              className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50">

                <Redo2 className="w-4 h-4 text-foreground-secondary" />
              </button>
            </Tooltip>
          </div>

          <div data-ev-id="ev_e4c3272c49" className="h-6 w-px bg-border mx-1" />

          <Tooltip content="Preview">
            <Button variant="outline" size="icon" onClick={onPreview}>
              <Eye className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Button variant="outline" onClick={onSave} leftIcon={<Save className="w-4 h-4" />}>
            Save
          </Button>

          <Button onClick={onPublish} leftIcon={<Rocket className="w-4 h-4" />}>
            Publish
          </Button>

          <Dropdown
            align="right"
            trigger={
            <button data-ev-id="ev_2120daf6d0" className="p-2 rounded-lg hover:bg-muted transition-colors">
                <MoreVertical className="w-4 h-4 text-foreground-secondary" />
              </button>
            }>

            <DropdownItem icon={<Settings className="w-4 h-4" />}>Website Settings</DropdownItem>
            <DropdownItem>Duplicate</DropdownItem>
            <DropdownItem>Export</DropdownItem>
            <DropdownSeparator />
            <DropdownItem destructive>Delete Website</DropdownItem>
          </Dropdown>
        </div>
      </header>

      {/* Editor Body */}
      <div data-ev-id="ev_15faa118dd" className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Components */}
        <aside data-ev-id="ev_908d745c93" className="w-72 bg-surface border-r border-border flex flex-col overflow-hidden flex-shrink-0">
          {leftSidebar}
        </aside>

        {/* Canvas */}
        <div data-ev-id="ev_1e3e987801" className="flex-1 overflow-auto p-6 flex justify-center">
          <div data-ev-id="ev_e8406ddd07"
          className={`
              ${deviceWidths[device]} max-w-full transition-all duration-300
              bg-white rounded-lg shadow-xl overflow-hidden
            `}>

            {children}
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <aside data-ev-id="ev_21516eb12d" className="w-80 bg-surface border-l border-border flex flex-col overflow-hidden flex-shrink-0">
          {rightSidebar}
        </aside>
      </div>
    </div>);

}