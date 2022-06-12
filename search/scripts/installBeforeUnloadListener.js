function installBeforeUnloadListener()
{
    var window = document.defaultView;
    if (window != null)
    {
        window.addEventListener('beforeunload', event => { notifyTriggered(); });
        return notifyInstalled(true);
    }
    else
        return notifyInstalled(false);
}

function notifyInstalled(success)
{
    return DotNet.invokeMethodAsync('WpfLayout.Blazor', 'OnBeforeUnloadListenerInstalled', success);
}

function notifyTriggered()
{
    return DotNet.invokeMethodAsync('WpfLayout.Blazor', 'OnBeforeUnloadTriggered');
}
