import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
}

const products: Product[] = [
  { id: 1, name: 'Черный свитер оверсайз', price: 12900, image: 'https://cdn.poehali.dev/projects/3ce35078-2aa1-4578-bc97-b952991c9f81/files/51887e94-f89d-4b32-9e33-0308e295d2e7.jpg', category: 'Верх', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 2, name: 'Кожаная куртка Premium', price: 34900, image: 'https://cdn.poehali.dev/projects/3ce35078-2aa1-4578-bc97-b952991c9f81/files/77c58d8d-238e-4248-bba4-3e261bf57bc1.jpg', category: 'Верх', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 3, name: 'Минималистичное пальто', price: 28900, image: 'https://cdn.poehali.dev/projects/3ce35078-2aa1-4578-bc97-b952991c9f81/files/51887e94-f89d-4b32-9e33-0308e295d2e7.jpg', category: 'Верх', sizes: ['XS', 'S', 'M', 'L'] },
  { id: 4, name: 'Брюки прямого кроя', price: 15900, image: 'https://cdn.poehali.dev/projects/3ce35078-2aa1-4578-bc97-b952991c9f81/files/77c58d8d-238e-4248-bba4-3e261bf57bc1.jpg', category: 'Низ', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 5, name: 'Джинсы черные классика', price: 18900, image: 'https://cdn.poehali.dev/projects/3ce35078-2aa1-4578-bc97-b952991c9f81/files/51887e94-f89d-4b32-9e33-0308e295d2e7.jpg', category: 'Низ', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 6, name: 'Футболка базовая черная', price: 4900, image: 'https://cdn.poehali.dev/projects/3ce35078-2aa1-4578-bc97-b952991c9f81/files/77c58d8d-238e-4248-bba4-3e261bf57bc1.jpg', category: 'Верх', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
];

const sizeGuide = {
  men: {
    tops: [
      { size: 'XS', chest: '88-92', waist: '72-76', hips: '88-92' },
      { size: 'S', chest: '92-96', waist: '76-80', hips: '92-96' },
      { size: 'M', chest: '96-100', waist: '80-84', hips: '96-100' },
      { size: 'L', chest: '100-104', waist: '84-88', hips: '100-104' },
      { size: 'XL', chest: '104-108', waist: '88-92', hips: '104-108' },
      { size: 'XXL', chest: '108-112', waist: '92-96', hips: '108-112' },
    ],
    bottoms: [
      { size: 'XS', waist: '72-76', hips: '88-92', inseam: '76' },
      { size: 'S', waist: '76-80', hips: '92-96', inseam: '78' },
      { size: 'M', waist: '80-84', hips: '96-100', inseam: '80' },
      { size: 'L', waist: '84-88', hips: '100-104', inseam: '82' },
      { size: 'XL', waist: '88-92', hips: '104-108', inseam: '84' },
      { size: 'XXL', waist: '92-96', hips: '108-112', inseam: '86' },
    ],
  },
  women: {
    tops: [
      { size: 'XS', chest: '80-84', waist: '60-64', hips: '86-90' },
      { size: 'S', chest: '84-88', waist: '64-68', hips: '90-94' },
      { size: 'M', chest: '88-92', waist: '68-72', hips: '94-98' },
      { size: 'L', chest: '92-96', waist: '72-76', hips: '98-102' },
      { size: 'XL', chest: '96-100', waist: '76-80', hips: '102-106' },
    ],
    bottoms: [
      { size: 'XS', waist: '60-64', hips: '86-90', inseam: '74' },
      { size: 'S', waist: '64-68', hips: '90-94', inseam: '76' },
      { size: 'M', waist: '68-72', hips: '94-98', inseam: '78' },
      { size: 'L', waist: '72-76', hips: '98-102', inseam: '80' },
      { size: 'XL', waist: '76-80', hips: '102-106', inseam: '82' },
    ],
  },
};

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [activeSection, setActiveSection] = useState<string>('main');

  const categories = ['Все', 'Верх', 'Низ'];
  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-wider">BALNIK</h1>
            <div className="hidden md:flex gap-8">
              <button onClick={() => setActiveSection('main')} className="text-sm tracking-wide hover:text-primary transition-colors">Главная</button>
              <button onClick={() => setActiveSection('catalog')} className="text-sm tracking-wide hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => setActiveSection('collections')} className="text-sm tracking-wide hover:text-primary transition-colors">Коллекции</button>
              <button onClick={() => setActiveSection('about')} className="text-sm tracking-wide hover:text-primary transition-colors">О бренде</button>
              <button onClick={() => setActiveSection('contacts')} className="text-sm tracking-wide hover:text-primary transition-colors">Контакты</button>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="ShoppingBag" size={20} />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {activeSection === 'main' && (
        <>
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-10" />
            <img 
              src="https://cdn.poehali.dev/projects/3ce35078-2aa1-4578-bc97-b952991c9f81/files/63e18261-4145-4c29-8c44-27e85a4e5e5b.jpg" 
              alt="Hero" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 text-center animate-fade-in">
              <h2 className="text-6xl md:text-8xl font-light tracking-widest mb-6">ТЕМНАЯ ЭЛЕГАНТНОСТЬ</h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light">Коллекция Осень/Зима 2025</p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg tracking-wider">
                Смотреть коллекцию
              </Button>
            </div>
          </section>

          <section className="container mx-auto px-6 py-24">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card border-border p-8 hover:border-primary transition-all duration-300 cursor-pointer group">
                <Icon name="Shirt" size={48} className="mb-6 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold mb-4">Качество</h3>
                <p className="text-muted-foreground">Премиальные материалы и безупречный пошив</p>
              </Card>
              <Card className="bg-card border-border p-8 hover:border-primary transition-all duration-300 cursor-pointer group">
                <Icon name="Palette" size={48} className="mb-6 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold mb-4">Дизайн</h3>
                <p className="text-muted-foreground">Минималистичная эстетика и вечный стиль</p>
              </Card>
              <Card className="bg-card border-border p-8 hover:border-primary transition-all duration-300 cursor-pointer group">
                <Icon name="Leaf" size={48} className="mb-6 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold mb-4">Экология</h3>
                <p className="text-muted-foreground">Осознанное производство и забота о планете</p>
              </Card>
            </div>
          </section>
        </>
      )}

      {activeSection === 'catalog' && (
        <section className="container mx-auto px-6 py-32">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl tracking-wider font-bold">Каталог</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Icon name="Ruler" size={18} />
                  Размерная сетка
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Размерная сетка и гид по выбору размера</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="men" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="men">Мужская</TabsTrigger>
                    <TabsTrigger value="women">Женская</TabsTrigger>
                  </TabsList>
                  <TabsContent value="men" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Верхняя одежда (см)</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3">Размер</th>
                              <th className="text-left p-3">Обхват груди</th>
                              <th className="text-left p-3">Обхват талии</th>
                              <th className="text-left p-3">Обхват бедер</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeGuide.men.tops.map((size) => (
                              <tr key={size.size} className="border-b border-border/50 hover:bg-muted/50">
                                <td className="p-3 font-semibold">{size.size}</td>
                                <td className="p-3">{size.chest}</td>
                                <td className="p-3">{size.waist}</td>
                                <td className="p-3">{size.hips}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Брюки и джинсы (см)</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3">Размер</th>
                              <th className="text-left p-3">Обхват талии</th>
                              <th className="text-left p-3">Обхват бедер</th>
                              <th className="text-left p-3">Длина по внутр. шву</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeGuide.men.bottoms.map((size) => (
                              <tr key={size.size} className="border-b border-border/50 hover:bg-muted/50">
                                <td className="p-3 font-semibold">{size.size}</td>
                                <td className="p-3">{size.waist}</td>
                                <td className="p-3">{size.hips}</td>
                                <td className="p-3">{size.inseam}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="women" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Верхняя одежда (см)</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3">Размер</th>
                              <th className="text-left p-3">Обхват груди</th>
                              <th className="text-left p-3">Обхват талии</th>
                              <th className="text-left p-3">Обхват бедер</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeGuide.women.tops.map((size) => (
                              <tr key={size.size} className="border-b border-border/50 hover:bg-muted/50">
                                <td className="p-3 font-semibold">{size.size}</td>
                                <td className="p-3">{size.chest}</td>
                                <td className="p-3">{size.waist}</td>
                                <td className="p-3">{size.hips}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Брюки и джинсы (см)</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-3">Размер</th>
                              <th className="text-left p-3">Обхват талии</th>
                              <th className="text-left p-3">Обхват бедер</th>
                              <th className="text-left p-3">Длина по внутр. шву</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeGuide.women.bottoms.map((size) => (
                              <tr key={size.size} className="border-b border-border/50 hover:bg-muted/50">
                                <td className="p-3 font-semibold">{size.size}</td>
                                <td className="p-3">{size.waist}</td>
                                <td className="p-3">{size.hips}</td>
                                <td className="p-3">{size.inseam}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="mt-8 bg-muted p-6 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Info" size={20} className="text-primary" />
                    Как правильно снять мерки
                  </h4>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="chest">
                      <AccordionTrigger>Обхват груди</AccordionTrigger>
                      <AccordionContent>
                        Измерьте по самым выступающим точкам груди. Сантиметровая лента должна проходить горизонтально, плотно облегая тело, но не сдавливая его.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="waist">
                      <AccordionTrigger>Обхват талии</AccordionTrigger>
                      <AccordionContent>
                        Измерьте в самом узком месте талии, обычно чуть выше пупка. Не втягивайте живот при измерении.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="hips">
                      <AccordionTrigger>Обхват бедер</AccordionTrigger>
                      <AccordionContent>
                        Измерьте по самым выступающим точкам ягодиц. Лента должна проходить горизонтально вокруг тела.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="inseam">
                      <AccordionTrigger>Длина по внутреннему шву</AccordionTrigger>
                      <AccordionContent>
                        Измерьте от паха до пола по внутренней стороне ноги, стоя босиком. Это поможет определить правильную длину брюк.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex gap-4 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className="tracking-wide"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary transition-all duration-300">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                  <p className="text-2xl font-light text-primary mb-4">{product.price.toLocaleString('ru-RU')} ₽</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {product.sizes.map((size) => (
                      <span key={size} className="px-3 py-1 border border-border text-sm hover:border-primary transition-colors">
                        {size}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Добавить в корзину
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'collections' && (
        <section className="container mx-auto px-6 py-32">
          <h2 className="text-4xl font-light tracking-wider mb-12">Коллекции</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border overflow-hidden group cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/3ce35078-2aa1-4578-bc97-b952991c9f81/files/63e18261-4145-4c29-8c44-27e85a4e5e5b.jpg"
                  alt="Осень/Зима 2025"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">Осень/Зима 2025</h3>
                <p className="text-muted-foreground mb-6">Элегантность в каждой детали. Коллекция, вдохновленная урбанистической эстетикой.</p>
                <Button variant="outline">Смотреть коллекцию</Button>
              </div>
            </Card>
            <Card className="bg-card border-border overflow-hidden group cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/3ce35078-2aa1-4578-bc97-b952991c9f81/files/51887e94-f89d-4b32-9e33-0308e295d2e7.jpg"
                  alt="Базовая коллекция"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">Базовая коллекция</h3>
                <p className="text-muted-foreground mb-6">Вечная классика. Вещи, которые остаются актуальными вне времени и трендов.</p>
                <Button variant="outline">Смотреть коллекцию</Button>
              </div>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="container mx-auto px-6 py-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-light tracking-wider mb-8">О бренде</h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>BALNIK — это бренд для тех, кто ценит минимализм, качество и вечный стиль. Мы создаем одежду, которая говорит сама за себя, не нуждаясь в излишних деталях.</p>
              <p>
                Наша философия — это сочетание классических силуэтов с современными материалами. Каждая вещь проходит тщательный отбор и создается с вниманием к деталям.
              </p>
              <p>
                Мы верим в осознанное потребление и производим одежду, которая прослужит вам годы, становясь только лучше со временем.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="container mx-auto px-6 py-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-light tracking-wider mb-12">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Шоурум</h3>
                <p className="text-muted-foreground mb-2">Москва, ул. Тверская, 15</p>
                <p className="text-muted-foreground mb-2">Ежедневно: 11:00 — 21:00</p>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Онлайн</h3>
                <p className="text-muted-foreground mb-2">support@noir-brand.com</p>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" size="icon">
                    <Icon name="Instagram" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-6 py-12 bg-[#000000]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-sm font-semibold">© 2025 BALNIK. Все права защищены.</p>
            <div className="flex gap-8 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Политика конфиденциальности</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Доставка и возврат</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}