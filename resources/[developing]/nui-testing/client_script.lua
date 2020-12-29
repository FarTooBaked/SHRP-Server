local display = false

RegisterCommand("nui", function(source, args)
    TriggerServerEvent("ClientDebug", "You done the command (CONSOLE DEBUG)")
    SetDisplay(not display)
end)


AddEventHandler("playerSpawned", function()
    TriggerServerEvent("ClientDebug")

    serverid = string.format("Player Server Id %s", GetPlayerServerId(player))
    TriggerServerEvent("ClientDebug", serverid)
end)

RegisterNUICallback("debug", function(data)
    TriggerServerEvent("ClientDebug", "We clicked the image!")
end)

--very important cb 
RegisterNUICallback("exit", function(data)
    chat("exited", {0,255,0})
    SetDisplay(false)

    print("exited")

    EnableControlAction(0, 1, 0) -- LookLeftRight
    EnableControlAction(0, 2, 0) -- LookUpDown
    EnableControlAction(0, 142, 0) -- MeleeAttackAlternate
    EnableControlAction(0, 18, 0) -- Enter
    EnableControlAction(0, 322, 0) -- ESC
    EnableControlAction(0, 106, 0) -- VehicleMouseControlOverride
end)

-- this cb is used as the main route to transfer data back 
-- and also where we hanld the data sent from js
RegisterNUICallback("main", function(data)
    chat(data.text, {0,255,0})
    SetDisplay(false)
end)

RegisterNUICallback("error", function(data)
    chat(data.error, {255,0,0})
    SetDisplay(false)
end)

function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "ui",
        status = bool,
    })
end

function chat(str, color)
    TriggerEvent(
        'chat:addMessage',
        {
            color = color,
            multiline = true,
            args = {str}
        }
    )
end
