require "http/client"
require "json"

url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"

response = HTTP::Client.get(url)
data = JSON.parse(response.body)
price = data["bitcoin"]["usd"].to_f

puts "BTC narxi: $#{price}"
