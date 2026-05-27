import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Layout,
  Type,
  Image,
  Play,
  Mail,
  MousePointer,
  Minus,
  MoveVertical,
  Columns,
  Grid,
  MessageCircle,
  CreditCard,
  Zap,
  Menu,
  GripVertical,
  ChevronRight,
  Palette,
  Layers,
  Settings,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Trash2,
  Copy,
  Eye,
  EyeOff } from
'lucide-react';
import { EditorLayout } from '@/components/layout/EditorLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Dropdown';
import { Toggle } from '@/components/ui/Toggle';
import { PublishModal } from '@/components/PublishModal';
import type { EditorBlock } from '@/types';

const blockIcons: Record<string, React.ElementType> = {
  hero: Layout,
  features: Grid,
  pricing: CreditCard,
  testimonials: MessageCircle,
  cta: Zap,
  header: Menu,
  footer: Layout,
  text: Type,
  image: Image,
  video: Play,
  gallery: Image,
  button: MousePointer,
  form: Mail,
  columns: Columns,
  divider: Minus,
  spacer: MoveVertical
};

const blockCategories = [
{ id: 'layout', label: 'Layout', icon: Layout },
{ id: 'content', label: 'Content', icon: Type },
{ id: 'media', label: 'Media', icon: Image },
{ id: 'forms', label: 'Forms', icon: Mail }];


const blocks: EditorBlock[] = [
{ id: 'hero', type: 'hero', name: 'Hero Section', icon: 'layout', category: 'layout' },
{ id: 'features', type: 'features', name: 'Features', icon: 'grid', category: 'layout' },
{ id: 'pricing', type: 'pricing', name: 'Pricing', icon: 'credit-card', category: 'layout' },
{ id: 'testimonials', type: 'testimonials', name: 'Testimonials', icon: 'message-circle', category: 'layout' },
{ id: 'cta', type: 'cta', name: 'Call to Action', icon: 'zap', category: 'layout' },
{ id: 'header', type: 'header', name: 'Header', icon: 'menu', category: 'layout' },
{ id: 'footer', type: 'footer', name: 'Footer', icon: 'layout', category: 'layout' },
{ id: 'columns', type: 'columns', name: 'Columns', icon: 'columns', category: 'layout' },
{ id: 'text', type: 'text', name: 'Text Block', icon: 'type', category: 'content' },
{ id: 'button', type: 'button', name: 'Button', icon: 'mouse-pointer', category: 'content' },
{ id: 'divider', type: 'divider', name: 'Divider', icon: 'minus', category: 'content' },
{ id: 'spacer', type: 'spacer', name: 'Spacer', icon: 'move-vertical', category: 'content' },
{ id: 'image', type: 'image', name: 'Image', icon: 'image', category: 'media' },
{ id: 'video', type: 'video', name: 'Video', icon: 'play', category: 'media' },
{ id: 'gallery', type: 'gallery', name: 'Gallery', icon: 'images', category: 'media' },
{ id: 'form', type: 'form', name: 'Contact Form', icon: 'mail', category: 'forms' }];


interface CanvasBlock {
  id: string;
  type: string;
  name: string;
}

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([
  { id: '1', type: 'header', name: 'Header' },
  { id: '2', type: 'hero', name: 'Hero Section' },
  { id: '3', type: 'features', name: 'Features' }]
  );
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [blockCategory, setBlockCategory] = useState('layout');

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const handleAddBlock = (block: EditorBlock) => {
    const newBlock: CanvasBlock = {
      id: Date.now().toString(),
      type: block.type,
      name: block.name
    };
    setCanvasBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const handleDeleteBlock = (blockId: string) => {
    setCanvasBlocks((prev) => prev.filter((b) => b.id !== blockId));
    if (selectedBlockId === blockId) setSelectedBlockId(null);
  };

  const handleDuplicateBlock = (blockId: string) => {
    const block = canvasBlocks.find((b) => b.id === blockId);
    if (block) {
      const newBlock: CanvasBlock = {
        id: Date.now().toString(),
        type: block.type,
        name: block.name
      };
      const index = canvasBlocks.findIndex((b) => b.id === blockId);
      setCanvasBlocks((prev) => [
      ...prev.slice(0, index + 1),
      newBlock,
      ...prev.slice(index + 1)]
      );
    }
  };

  const selectedBlock = canvasBlocks.find((b) => b.id === selectedBlockId);

  const filteredBlocks = blocks.filter((b) => b.category === blockCategory);

  // Left Sidebar - Components/Blocks
  const leftSidebar =
  <div data-ev-id="ev_a31bac3df9" className="flex flex-col h-full">
      <div data-ev-id="ev_dc9a428437" className="p-4 border-b border-border">
        <Input isSearch placeholder="Search blocks..." />
      </div>
      
      {/* Category Tabs */}
      <div data-ev-id="ev_6ee80750b6" className="flex border-b border-border">
        {blockCategories.map((cat) =>
      <button data-ev-id="ev_8a8a6e8def"
      key={cat.id}
      onClick={() => setBlockCategory(cat.id)}
      className={`
              flex-1 py-3 text-xs font-medium text-center transition-colors
              ${blockCategory === cat.id ?
      'text-primary border-b-2 border-primary' :
      'text-muted-foreground hover:text-foreground'}
            `
      }>

            <cat.icon className="w-4 h-4 mx-auto mb-1" />
            {cat.label}
          </button>
      )}
      </div>

      {/* Blocks Grid */}
      <div data-ev-id="ev_d9e6c29349" className="flex-1 overflow-auto p-4 custom-scrollbar">
        <div data-ev-id="ev_29b2463b43" className="grid grid-cols-2 gap-2">
          {filteredBlocks.map((block) => {
          const Icon = blockIcons[block.type] || Layout;
          return (
            <button data-ev-id="ev_e5ee9a1179"
            key={block.id}
            onClick={() => handleAddBlock(block)}
            className="
                  p-4 rounded-xl border border-border bg-surface
                  hover:border-primary hover:bg-primary/5
                  transition-all duration-200
                  flex flex-col items-center gap-2 text-center
                  group
                ">







                <div data-ev-id="ev_28fa41a198" className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                </div>
                <span data-ev-id="ev_2142b4a621" className="text-xs font-medium text-foreground">{block.name}</span>
              </button>);

        })}
        </div>
      </div>

      {/* Layers Panel */}
      <div data-ev-id="ev_a958b57716" className="border-t border-border">
        <button data-ev-id="ev_6227fdac55" className="w-full p-3 flex items-center justify-between text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <span data-ev-id="ev_da6fd3a9c8" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Layers
          </span>
          <Badge variant="secondary" size="sm">{canvasBlocks.length}</Badge>
        </button>
      </div>
    </div>;


  // Right Sidebar - Properties/Styles
  const rightSidebar =
  <div data-ev-id="ev_e2c968f415" className="flex flex-col h-full">
      {selectedBlock ?
    <>
          <div data-ev-id="ev_d6bb923f8b" className="p-4 border-b border-border">
            <div data-ev-id="ev_edf9153cd2" className="flex items-center justify-between">
              <h3 data-ev-id="ev_e8820d432a" className="font-semibold text-foreground">{selectedBlock.name}</h3>
              <div data-ev-id="ev_698acccb6c" className="flex items-center gap-1">
                <button data-ev-id="ev_8f24d4f84d"
            onClick={() => handleDuplicateBlock(selectedBlock.id)}
            className="p-1.5 rounded-md hover:bg-muted transition-colors">

                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
                <button data-ev-id="ev_5955a64399"
            onClick={() => handleDeleteBlock(selectedBlock.id)}
            className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors">

                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="style" className="flex-1 flex flex-col">
            <TabsList className="mx-4 mt-4">
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="style" className="flex-1 overflow-auto p-4 custom-scrollbar">
              <div data-ev-id="ev_d792034360" className="flex flex-col gap-6">
                {/* Typography */}
                <div data-ev-id="ev_2447fceedb">
                  <h4 data-ev-id="ev_e94eeee0d2" className="text-sm font-medium text-foreground mb-3">Typography</h4>
                  <div data-ev-id="ev_36494684df" className="flex flex-col gap-3">
                    <Select
                  value="inter"
                  onChange={() => {}}
                  options={[
                  { value: 'inter', label: 'Inter' },
                  { value: 'roboto', label: 'Roboto' },
                  { value: 'poppins', label: 'Poppins' }]
                  } />

                    <div data-ev-id="ev_89a6e999df" className="flex gap-2">
                      <Select
                    value="16"
                    onChange={() => {}}
                    options={[
                    { value: '14', label: '14px' },
                    { value: '16', label: '16px' },
                    { value: '18', label: '18px' },
                    { value: '24', label: '24px' }]
                    }
                    className="flex-1" />

                      <Select
                    value="400"
                    onChange={() => {}}
                    options={[
                    { value: '400', label: 'Regular' },
                    { value: '500', label: 'Medium' },
                    { value: '600', label: 'Semibold' },
                    { value: '700', label: 'Bold' }]
                    }
                    className="flex-1" />

                    </div>
                    <div data-ev-id="ev_8a335e3707" className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                      {[
                  { icon: AlignLeft, value: 'left' },
                  { icon: AlignCenter, value: 'center' },
                  { icon: AlignRight, value: 'right' }].
                  map(({ icon: Icon, value }) =>
                  <button data-ev-id="ev_7eb7f28962"
                  key={value}
                  className="flex-1 p-2 rounded-md hover:bg-surface transition-colors">

                          <Icon className="w-4 h-4 mx-auto text-muted-foreground" />
                        </button>
                  )}
                    </div>
                    <div data-ev-id="ev_1f45212579" className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                      {[
                  { icon: Bold, value: 'bold' },
                  { icon: Italic, value: 'italic' },
                  { icon: Underline, value: 'underline' },
                  { icon: Link, value: 'link' }].
                  map(({ icon: Icon, value }) =>
                  <button data-ev-id="ev_20b9d84117"
                  key={value}
                  className="flex-1 p-2 rounded-md hover:bg-surface transition-colors">

                          <Icon className="w-4 h-4 mx-auto text-muted-foreground" />
                        </button>
                  )}
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div data-ev-id="ev_39dabd5821">
                  <h4 data-ev-id="ev_bed058ca52" className="text-sm font-medium text-foreground mb-3">Colors</h4>
                  <div data-ev-id="ev_c75f1c97c9" className="flex flex-col gap-3">
                    <div data-ev-id="ev_1c938339cc" className="flex items-center gap-3">
                      <span data-ev-id="ev_68760c0f4e" className="text-sm text-muted-foreground w-20">Text</span>
                      <div data-ev-id="ev_7f31419c60" className="flex-1 flex items-center gap-2">
                        <div data-ev-id="ev_37bdfce765" className="w-8 h-8 rounded-lg bg-foreground border border-border cursor-pointer" />
                        <Input defaultValue="#0f172a" className="flex-1" />
                      </div>
                    </div>
                    <div data-ev-id="ev_7a77f86456" className="flex items-center gap-3">
                      <span data-ev-id="ev_7d420e0f12" className="text-sm text-muted-foreground w-20">Background</span>
                      <div data-ev-id="ev_e301573efb" className="flex-1 flex items-center gap-2">
                        <div data-ev-id="ev_6132e2a52d" className="w-8 h-8 rounded-lg bg-white border border-border cursor-pointer" />
                        <Input defaultValue="#ffffff" className="flex-1" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacing */}
                <div data-ev-id="ev_7d18a94c91">
                  <h4 data-ev-id="ev_1cc5b30bff" className="text-sm font-medium text-foreground mb-3">Spacing</h4>
                  <div data-ev-id="ev_54167888f0" className="grid grid-cols-2 gap-3">
                    <Input label="Padding Top" defaultValue="48" />
                    <Input label="Padding Bottom" defaultValue="48" />
                    <Input label="Padding Left" defaultValue="24" />
                    <Input label="Padding Right" defaultValue="24" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 overflow-auto p-4 custom-scrollbar">
              <div data-ev-id="ev_c84e0ee771" className="flex flex-col gap-4">
                <Input label="Section ID" defaultValue={`section-${selectedBlock.id}`} hint="Used for anchor links" />
                <Input label="CSS Classes" placeholder="Add custom classes" />
                <Toggle label="Visible" description="Show/hide this section" defaultChecked />
                <Toggle label="Full Width" description="Extend to full viewport" />
              </div>
            </TabsContent>
          </Tabs>
        </> :

    <div data-ev-id="ev_d52db9e56c" className="flex-1 flex items-center justify-center p-8 text-center">
          <div data-ev-id="ev_7a271ed06e">
            <div data-ev-id="ev_a4eeea2304" className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <MousePointer className="w-8 h-8 text-muted-foreground" />
            </div>
            <p data-ev-id="ev_bfab0a4adf" className="text-foreground font-medium mb-1">No element selected</p>
            <p data-ev-id="ev_a69ba3a45e" className="text-sm text-muted-foreground">
              Click on an element in the canvas to edit its properties
            </p>
          </div>
        </div>
    }
    </div>;


  return (
    <>
      <EditorLayout
        leftSidebar={leftSidebar}
        rightSidebar={rightSidebar}
        onSave={handleSave}
        onPublish={() => setPublishModalOpen(true)}
        onPreview={() => navigate(`/preview/${id}`)}
        isSaving={isSaving}
        lastSaved="2 min ago"
        websiteName={isNew ? 'Untitled Website' : 'My Portfolio'}>

        {/* Canvas Content */}
        <div data-ev-id="ev_026a73d166" className="min-h-[800px] flex flex-col">
          {canvasBlocks.length === 0 ?
          <div data-ev-id="ev_a9d5126609" className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-xl m-4">
              <div data-ev-id="ev_80744953cc" className="text-center">
                <p data-ev-id="ev_73bd4c5d9d" className="text-foreground font-medium mb-2">Start building your website</p>
                <p data-ev-id="ev_090671d9b2" className="text-sm text-muted-foreground mb-4">Drag blocks from the left sidebar or click to add</p>
                <Button variant="outline" onClick={() => handleAddBlock(blocks[0])}>
                  Add First Block
                </Button>
              </div>
            </div> :

          canvasBlocks.map((block, index) => {
            const Icon = blockIcons[block.type] || Layout;
            const isSelected = selectedBlockId === block.id;

            return (
              <div data-ev-id="ev_b6861532e9"
              key={block.id}
              onClick={() => setSelectedBlockId(block.id)}
              className={`
                    relative group cursor-pointer transition-all
                    ${isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/30'}
                  `}>

                  {/* Block Content Preview */}
                  {block.type === 'header' &&
                <div data-ev-id="ev_1f5d5eaee5" className="bg-white border-b border-gray-100 px-8 py-4">
                      <div data-ev-id="ev_a405358185" className="flex items-center justify-between max-w-6xl mx-auto">
                        <div data-ev-id="ev_cdb89a0c0b" className="flex items-center gap-2">
                          <div data-ev-id="ev_bb86fefa5b" className="w-8 h-8 rounded-lg bg-primary/10" />
                          <span data-ev-id="ev_28d8733801" className="font-semibold text-gray-900">Brand</span>
                        </div>
                        <div data-ev-id="ev_e4fd8acd64" className="flex items-center gap-6">
                          {['Home', 'Features', 'Pricing', 'Contact'].map((item) =>
                      <span data-ev-id="ev_1ff8d08b3e" key={item} className="text-sm text-gray-600 hover:text-gray-900">{item}</span>
                      )}
                        </div>
                        <button data-ev-id="ev_5653c45c74" className="px-4 py-2 bg-primary text-white text-sm rounded-lg">
                          Get Started
                        </button>
                      </div>
                    </div>
                }
                  
                  {block.type === 'hero' &&
                <div data-ev-id="ev_df320f9d04" className="bg-gradient-to-br from-primary/5 to-accent/5 px-8 py-24">
                      <div data-ev-id="ev_1ea0799e8f" className="max-w-4xl mx-auto text-center">
                        <h1 data-ev-id="ev_917dc2f966" className="text-5xl font-bold text-gray-900 mb-6">
                          Build Beautiful Websites
                        </h1>
                        <p data-ev-id="ev_f4c195247d" className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                          Create stunning websites without writing a single line of code. 
                          Start with a template and customize everything.
                        </p>
                        <div data-ev-id="ev_46526ac0c4" className="flex items-center justify-center gap-4">
                          <button data-ev-id="ev_ee4b97a1dd" className="px-6 py-3 bg-primary text-white rounded-lg font-medium">
                            Get Started Free
                          </button>
                          <button data-ev-id="ev_66b8a02dda" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium">
                            Watch Demo
                          </button>
                        </div>
                      </div>
                    </div>
                }
                  
                  {block.type === 'features' &&
                <div data-ev-id="ev_96be14a8cb" className="bg-white px-8 py-20">
                      <div data-ev-id="ev_2486536b9e" className="max-w-6xl mx-auto">
                        <h2 data-ev-id="ev_82ac850251" className="text-3xl font-bold text-gray-900 text-center mb-12">
                          Everything you need
                        </h2>
                        <div data-ev-id="ev_db9399c6ab" className="grid grid-cols-3 gap-8">
                          {[1, 2, 3].map((i) =>
                      <div data-ev-id="ev_e63c948e4d" key={i} className="p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                              <div data-ev-id="ev_ca14da9b68" className="w-12 h-12 rounded-xl bg-primary/10 mb-4" />
                              <h3 data-ev-id="ev_9f0175982a" className="font-semibold text-gray-900 mb-2">Feature {i}</h3>
                              <p data-ev-id="ev_60cf4087e3" className="text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                              </p>
                            </div>
                      )}
                        </div>
                      </div>
                    </div>
                }

                  {!['header', 'hero', 'features'].includes(block.type) &&
                <div data-ev-id="ev_d27e60b4f9" className="bg-gray-50 px-8 py-16 flex items-center justify-center">
                      <div data-ev-id="ev_b91240bd23" className="text-center">
                        <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p data-ev-id="ev_180a59a506" className="text-gray-500 font-medium">{block.name}</p>
                      </div>
                    </div>
                }

                  {/* Hover Controls */}
                  <div data-ev-id="ev_f94c6230e2" className={`
                    absolute top-2 right-2 flex items-center gap-1
                    ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    transition-opacity
                  `}>
                    <button data-ev-id="ev_2b01ad56a2" className="p-1.5 rounded-md bg-white shadow-sm border border-gray-200 hover:bg-gray-50">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    <button data-ev-id="ev_336d9dabec"
                  onClick={(e) => {e.stopPropagation();handleDuplicateBlock(block.id);}}
                  className="p-1.5 rounded-md bg-white shadow-sm border border-gray-200 hover:bg-gray-50">

                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                    <button data-ev-id="ev_c9c88ed352"
                  onClick={(e) => {e.stopPropagation();handleDeleteBlock(block.id);}}
                  className="p-1.5 rounded-md bg-white shadow-sm border border-gray-200 hover:bg-red-50">

                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected &&
                <div data-ev-id="ev_e76b8e8dcb" className="absolute -left-1 top-0 bottom-0 w-1 bg-primary rounded-full" />
                }
                </div>);

          })
          }
        </div>
      </EditorLayout>

      <PublishModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        websiteName="My Portfolio" />

    </>);

}