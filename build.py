
def file_to_str(filename):
    f = file(filename, "r")
    result = f.read()
    f.close()
    return result

version = '1.0.1'
javascripts = [
    'summer.js',
    'summer.controllers.js',
    'summer.views.js'
]

output = file('summer-' + version + '.js','w')
for js in javascripts:
    output.write(file_to_str(js) + '\n')
output.close()




