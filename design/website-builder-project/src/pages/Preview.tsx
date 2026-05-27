import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { X, Monitor, Tablet, Smartphone, ExternalLink, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';

type Device = 'desktop' | 'tablet' | 'mobile';

export default function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState<Device>('desktop');

  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <div data-ev-id="ev_3c52f76cf8" className="h-screen flex flex-col bg-background-tertiary">
      {/* Header */}
      <header data-ev-id="ev_8dd8b76099" className="h-14 bg-surface border-b border-border px-4 flex items-center justify-between flex-shrink-0">
        <div data-ev-id="ev_2b948b82e3" className="flex items-center gap-3">
          <Tooltip content="Exit Preview">
            <button data-ev-id="ev_b1d8a5270a"
            onClick={() => navigate(`/editor/${id}`)}
            className="p-2 rounded-lg hover:bg-muted transition-colors">

              <X className="w-5 h-5 text-foreground-secondary" />
            </button>
          </Tooltip>
          <div data-ev-id="ev_09bce02d3b" className="h-6 w-px bg-border" />
          <span data-ev-id="ev_8b303c9dc9" className="text-sm font-medium text-foreground">Preview Mode</span>
        </div>

        {/* Device Switcher */}
        <div data-ev-id="ev_c86be728bd" className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          {[
          { id: 'desktop' as Device, icon: Monitor, label: 'Desktop' },
          { id: 'tablet' as Device, icon: Tablet, label: 'Tablet' },
          { id: 'mobile' as Device, icon: Smartphone, label: 'Mobile' }].
          map(({ id, icon: Icon, label }) =>
          <Tooltip key={id} content={label}>
              <button data-ev-id="ev_20476e2bdc"
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

        <div data-ev-id="ev_7fe20a45eb" className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/editor/${id}`)} leftIcon={<Edit className="w-4 h-4" />}>
            Edit
          </Button>
          <Button size="sm" leftIcon={<ExternalLink className="w-4 h-4" />}>
            Open Live
          </Button>
        </div>
      </header>

      {/* Preview Frame */}
      <div data-ev-id="ev_812422517a" className="flex-1 overflow-auto p-6 flex justify-center">
        <div data-ev-id="ev_c6d4dd89ad"
        className={`
            ${deviceWidths[device]} max-w-full transition-all duration-300
            bg-white rounded-lg shadow-2xl overflow-hidden
          `}>

          {/* Sample Preview Content */}
          <div data-ev-id="ev_6c8e01b5e8" className="min-h-[800px]">
            {/* Header */}
            <div data-ev-id="ev_faa9d19a1e" className="bg-white border-b border-gray-100 px-8 py-4">
              <div data-ev-id="ev_82d73d2c5d" className="flex items-center justify-between max-w-6xl mx-auto">
                <div data-ev-id="ev_39c1bf48f3" className="flex items-center gap-2">
                  <div data-ev-id="ev_7a9832d349" className="w-8 h-8 rounded-lg bg-indigo-500" />
                  <span data-ev-id="ev_e117cc9ac7" className="font-semibold text-gray-900">Brand</span>
                </div>
                <div data-ev-id="ev_6c7063d992" className={`flex items-center ${device === 'mobile' ? 'hidden' : 'gap-6'}`}>
                  {['Home', 'Features', 'Pricing', 'Contact'].map((item) =>
                  <span data-ev-id="ev_e82f46e3bf" key={item} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">{item}</span>
                  )}
                </div>
                <button data-ev-id="ev_df2ef0dbf8" className="px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg">
                  Get Started
                </button>
              </div>
            </div>

            {/* Hero */}
            <div data-ev-id="ev_b9b6912074" className="bg-gradient-to-br from-indigo-50 to-purple-50 px-8 py-24">
              <div data-ev-id="ev_a35d6ffa7b" className="max-w-4xl mx-auto text-center">
                <h1 data-ev-id="ev_438fcb65e5" className={`font-bold text-gray-900 mb-6 ${device === 'mobile' ? 'text-3xl' : 'text-5xl'}`}>
                  Build Beautiful Websites
                </h1>
                <p data-ev-id="ev_a14bf78ef6" className={`text-gray-600 mb-8 max-w-2xl mx-auto ${device === 'mobile' ? 'text-base' : 'text-xl'}`}>
                  Create stunning websites without writing a single line of code. 
                  Start with a template and customize everything.
                </p>
                <div data-ev-id="ev_7689d41e55" className={`flex items-center justify-center ${device === 'mobile' ? 'flex-col gap-3' : 'gap-4'}`}>
                  <button data-ev-id="ev_79cc2069e4" className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium w-full sm:w-auto">
                    Get Started Free
                  </button>
                  <button data-ev-id="ev_2e45cfc0a5" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium w-full sm:w-auto">
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div data-ev-id="ev_3c3d20d6ac" className="bg-white px-8 py-20">
              <div data-ev-id="ev_afa4e4b88d" className="max-w-6xl mx-auto">
                <h2 data-ev-id="ev_e8bbead2a1" className={`font-bold text-gray-900 text-center mb-12 ${device === 'mobile' ? 'text-2xl' : 'text-3xl'}`}>
                  Everything you need
                </h2>
                <div data-ev-id="ev_250c49c340" className={`grid gap-8 ${device === 'mobile' ? 'grid-cols-1' : device === 'tablet' ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {[1, 2, 3].map((i) =>
                  <div data-ev-id="ev_ac9d42f114" key={i} className="p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
                      <div data-ev-id="ev_82166de383" className="w-12 h-12 rounded-xl bg-indigo-100 mb-4" />
                      <h3 data-ev-id="ev_51e5625b26" className="font-semibold text-gray-900 mb-2">Feature {i}</h3>
                      <p data-ev-id="ev_dc9a3832ed" className="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}