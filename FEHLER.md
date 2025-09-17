No overload matches this call.
  Overload 1 of 2, '(props: { component: ElementType<any, keyof IntrinsicElements>; } & GridBaseProps & { sx?: SxProps<Theme> | undefined; } & SystemProps<...> & Omit<...>): Element | null', gave the following error.
    Property 'component' is missing in type '{ children: Element; key: string; xs: number; sm: number; md: number; item: true; }' but required in type '{ component: ElementType<any, keyof IntrinsicElements>; }'.
  Overload 2 of 2, '(props: DefaultComponentProps<GridTypeMap<{}, "div">>): Element | null', gave the following error.
    Type '{ children: Element; key: string; xs: number; sm: number; md: number; item: true; }' is not assignable to type 'IntrinsicAttributes & GridBaseProps & { sx?: SxProps<Theme> | undefined; } & SystemProps<Theme> & Omit<...>'.
      Property 'xs' does not exist on type 'IntrinsicAttributes & GridBaseProps & { sx?: SxProps<Theme> | undefined; } & SystemProps<Theme> & Omit<...>'.ts(2769)
index.d.ts(64, 5): 'component' is declared here.
⚠ Error (TS2769)  | 

No overload matches this call.
   

Overload 1 of 2:
gave the following error.
          	Property component   is missing in type:
but required in type:
.
   

Overload 2 of 2:
gave the following error.
          	Type:
is not assignable to type:
.
                	Property xs does not exist on type:
.
(alias) const Grid: OverridableComponent<GridTypeMap<{}, "div">>
import Grid
Demos:

Grid
API:

Grid API

—

Behoben (Gartenarbeit.tsx)

Ursache:
- MUI Grid tipleri (v7) mevcut kurulumda `item` + `xs/sm/md` (veya `breakpoints`) kombinasyonunda TS2769 hatasına yol açıyordu.

Çözüm:
- `src/page/Gartenarbeit.tsx` içinde MUI Grid yerine CSS Grid (MUI `Box`) kullanıldı.
- Responsive 3 sütun düzeni: `{ xs: 1, sm: 2, md: 3 }` ve aralıklar breakpoint’lere göre ayarlandı.
- Kartlarda görseller `aspect-ratio: 4/3` ve `object-fit: cover` ile ölçekleniyor.

Durum:
- Bu hatayı tetikleyen bölüm giderildi; TypeScript artık bu dosyada hata vermiyor.
- Not: Ayrı bir uyarı `src/page/Fotografie.tsx` dosyasında var (kullanılmayan `React` importu). İstenirse temizlenebilir.
