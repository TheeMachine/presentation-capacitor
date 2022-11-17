# presentation-capacitor

Capacitor Plugin for presentation api

## Install

```bash
npm install presentation-capacitor
npx cap sync
```

## API

<docgen-index>

* [`echo(...)`](#echo)
* [`openLink(...)`](#openlink)
* [`addListener('onSuccessLoadUrl', ...)`](#addlisteneronsuccessloadurl)
* [`addListener('onFailLoadUrl', ...)`](#addlisteneronfailloadurl)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### echo(...)

```typescript
echo(options: { value: string; }) => Promise<{ value: string; }>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### openLink(...)

```typescript
openLink(options: { url: string; }) => Promise<{ url: string; }>
```

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | <code>{ url: string; }</code> |

**Returns:** <code>Promise&lt;{ url: string; }&gt;</code>

--------------------


### addListener('onSuccessLoadUrl', ...)

```typescript
addListener(eventName: 'onSuccessLoadUrl', listenerFunc: (data: any) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                |
| ------------------ | ----------------------------------- |
| **`eventName`**    | <code>'onSuccessLoadUrl'</code>     |
| **`listenerFunc`** | <code>(data: any) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### addListener('onFailLoadUrl', ...)

```typescript
addListener(eventName: 'onFailLoadUrl', listenerFunc: (data: any) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

| Param              | Type                                |
| ------------------ | ----------------------------------- |
| **`eventName`**    | <code>'onFailLoadUrl'</code>        |
| **`listenerFunc`** | <code>(data: any) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
