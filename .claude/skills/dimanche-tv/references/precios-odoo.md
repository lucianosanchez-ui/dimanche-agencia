# Leer un precio de Odoo sin equivocarse

**Odoo manda**: es lo que cobra la caja. Notion queda como referencia de marca.
La fuente única en el repo es `motor-contenido/remotion/src/precios.ts` — cada
entrada con su código de Odoo. **Se edita ahí y se re-renderiza. Nunca se hardcodea
un precio adentro de un componente.**

## Conexión
`https://dimanche.odoo.com` · db `wansoft-tech-dimanche-main-31783933` ·
usuario `lucianosanchez@panaderiadimanche.ar`. La API key está en
`~/Desktop/migracion odoo/odoo_api_key.txt` (fuera del repo, nunca commitearla).
El `context` tiene que llevar **siempre** `allowed_company_ids: [1,2,3,4,5]` o los
registros multi-company desaparecen sin error.

## Las tres trampas

**1 · `list_price` está en NETO.** El precio de mostrador es `list_price × (1 + IVA)`.
Panificados 10,5% · pastelería y salado 21%. Los finales quedan **redondos** por
pedido de Luciano: si no da redondo, algo se leyó mal.

**2 · Los combos no se suman.** Un `product.combo` cobra un total propio que se
reparte entre las líneas hijas. El precio real se confirma mirando lo que cobró el
POS: `pos.order.line`, campo `price_subtotal_incl` de las líneas con `combo_parent_id`
(la línea cabecera va en 0). Sumar los componentes sueltos da mal.

**3 · El IVA de un combo MIXTO no es el del cabecera.** El neto se reparte 50/50
entre las patas, así que el multiplicador es el **promedio de las alícuotas**.
La promo café = café 21% + panificado 10,5% → **×1,1575**.
`list_price 3.801,28 × 1,1575 = $4.400`. Aplicarle 21% da $4.599 y **es mal** —
ese error ya se cometió.

## Consulta base
```python
import xmlrpc.client
URL="https://dimanche.odoo.com"; DB="wansoft-tech-dimanche-main-31783933"
USER="lucianosanchez@panaderiadimanche.ar"
KEY=open("/Users/luciano/Desktop/migracion odoo/odoo_api_key.txt").read().strip()
CTX={"allowed_company_ids":[1,2,3,4,5]}
uid=xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/common").authenticate(DB,USER,KEY,{})
mod=xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/object")
def ex(m,me,*a,**k):
    k.setdefault("context",CTX); return mod.execute_kw(DB,uid,KEY,m,me,list(a),k)

ids = ex("product.template","search",[["default_code","in",["PA0001","CA0002"]]])
ex("product.template","read", ids, fields=["default_code","name","list_price","taxes_id"])
```

## ¿Se vende hoy? (chequear ANTES de producir)
`available_in_pos` + `active` + venta en los últimos 60 días en `pos.order.line`.
Ranking de familias y huecos de placa: `docs/placas-tv.md`.

## Códigos que ya usan las placas
| Placa | Código | Qué es |
|---|---|---|
| promo café chica | `CO0011` | café 8oz + factura/medialuna/2 criollitos |
| promo café grande | `CO0012` | café 16oz + acompañamiento |
| café chico / grande | `CA0002` / `CA0001` | 8 oz / 16 oz |
| criollo común / hojaldre | `PA0004` / `PA0005` | el kilo |
| chipa queso | `PA0001` | el kilo |
| sanguchito / caja x9 | `SA0016` / `CO0015` | unidad / box |
| media docena / docena | `CO0001` / `CO0002` | el combo toma factura **o** medialuna |
| budines | `PE0001`–`PE0034` | dos niveles de precio |
| masas (familia) | `MA0002`, `MA0006`… | 21 SKU a un solo $/kg |

⚠ **Pedidos Ya lo carga Yanina a mano** y suele quedar atrasado — los códigos
`PY`/`PK`/`MP` no se tocan desde acá.
