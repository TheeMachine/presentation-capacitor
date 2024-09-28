# Presentation API Capacitor Plugin
This Capacitor plugin provides seamless integration with the Presentation API, enabling developers to display content on secondary screens, such as projectors or external displays, directly from their mobile and web applications.

Features
* **Multiple Screen Support:** Easily present content on external displays or projectors.
* **Customizable Content:** Display custom HTML, videos, or other types of media.
* **Cross-Platform Compatibility:** Works on Android and web platforms.
* **Simple Integration:** Easily integrate with Capacitor and your existing project.
* **Real-Time Updates:** Send real-time content updates to the external screen.

## Install

| Capacitor Version |Presentation Version|
| ------------- | ----------------------------------------------------------- |
| Capacitor v4  |  0.0.5|
| Capacitor v6  |  0.1.x|


```bash
npm install presentation-capacitor
npx cap sync
```

### Example Video (Example App included in repo)


https://github.com/user-attachments/assets/a2dbb1f7-6075-4285-885d-39136bc90d9b




## API

<docgen-index>

* [`open(...)`](#open)
* [`addListener('onSuccessLoadUrl', ...)`](#addlisteneronsuccessloadurl-)
* [`addListener('onFailLoadUrl', ...)`](#addlisteneronfailloadurl-)
* [`getDisplays()`](#getdisplays)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

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


#### OpenOptions

<code>{} & ( | { type: 'url'; url: string; } | { type: 'video'; videoOptions: { videoUrl: string; showControls?: boolean; }; } | { type: 'html'; html: string; } )</code>

</docgen-api>
