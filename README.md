# presentation-capacitor

Capacitor Plugin for presentation api

## Install

```bash
npm install presentation-capacitor
npx cap sync
```

### Example Video 

https://github.com/TheeMachine/presentation-capacitor/blob/version-0.1.0/records/example-record.mp4

## API

<docgen-index>

* [`openLink(...)`](#openlink)
* [`open(...)`](#open)
* [`addListener('onSuccessLoadUrl', ...)`](#addlisteneronsuccessloadurl-)
* [`addListener('onFailLoadUrl', ...)`](#addlisteneronfailloadurl-)
* [`getDisplays()`](#getdisplays)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### openLink(...)

```typescript
openLink(options: OpenLinkOptions) => Promise<OpenResponse>
```

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#openlinkoptions">OpenLinkOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#openresponse">OpenResponse</a>&gt;</code>

--------------------


### open(...)

```typescript
open(options: OpenOptions) => Promise<OpenResponse>
```

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#openoptions">OpenOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#openresponse">OpenResponse</a>&gt;</code>

--------------------


### addListener('onSuccessLoadUrl', ...)

```typescript
addListener(eventName: 'onSuccessLoadUrl', listenerFunc: (data: any) => void) => Promise<PluginListenerHandle> | PluginListenerHandle
```

| Param              | Type                                | Description                                             |
| ------------------ | ----------------------------------- | ------------------------------------------------------- |
| **`eventName`**    | <code>'onSuccessLoadUrl'</code>     |                                                         |
| **`listenerFunc`** | <code>(data: any) =&gt; void</code> | &lt;br&gt; Works only if type html of url or if browser |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a> | Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailLoadUrl', ...)

```typescript
addListener(eventName: 'onFailLoadUrl', listenerFunc: (data: any) => void) => Promise<PluginListenerHandle> | PluginListenerHandle
```

| Param              | Type                                |
| ------------------ | ----------------------------------- |
| **`eventName`**    | <code>'onFailLoadUrl'</code>        |
| **`listenerFunc`** | <code>(data: any) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a> | Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### getDisplays()

```typescript
getDisplays() => Promise<{ displays: number; }>
```

**Returns:** <code>Promise&lt;{ displays: number; }&gt;</code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### OpenResponse

<code>{ success?: any; error?: any; url?: any }</code>


#### OpenLinkOptions

<code>{ url: string; htmlStrings?: string } | { htmlStrings: string; url?: string }</code>


#### OpenOptions

<code>{} & ( | { type: 'url'; url: string; } | { type: 'video'; videoOptions: { videoUrl: string; showControls?: boolean; }; } | { type: 'html'; html: string; } )</code>

</docgen-api>
