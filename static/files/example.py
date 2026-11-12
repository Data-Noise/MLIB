import kan

dataset = [[[1,1],[1]],
           [[1,0],[0]],
           [[0,1],[0]],
           [[0,0],[0]]
]
model = kan.Sequential([
# x, y размер первого и последующего слоя, z размер сетки сплайна, чем больше, тем более гибким становится сплайн
    kan.Layer(2,2,5),
    kan.Layer(2,1,5)]
    )

model.lr = 0.01
for i in range(5000):
    for j in range(len(dataset)):
        m = model(dataset[j][0])
        err = m - dataset[j][1]
        model.backpropagation(err)
        model.gradient_descent()
        print(f"{dataset[j][0]} -> model:{round(m[0],3)} - true:{dataset[j][1][0]} = err:{round(err[0],5)}")

