RegisterNetEvent("ClientDebug")

AddEventHandler("ClientDebug", function(msg)
    if msg ~= nil then print(msg) end
end)