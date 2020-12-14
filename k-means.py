import numpy as np
import matplotlib.pyplot as plt    #导入所需要用到的numpy和matplotlib库
D=np.array([[0,1,2,4,5,5,6,1,1,1],
           [0,1,1,3,3,4,5,4,5,6]])   #输入要计算的数据集
m,n=D.shape    #得到数据集的行数、列数
k=3        #要分成k个簇
color=['b','r','y','g','p']    #每个簇要是用不同颜色的点绘制
def draw(s,k):                 #对得到的结果簇在坐标中表示出来，一个簇一种颜色
    m,n=s.shape
    for i in range(n):
        plt.plot(s[0][i],s[1][i],'o'+color[k-1])
def answer(x):        #
    s=np.array(x)
    a=set(x)
    a=list(a)
    for i in a:
        index=np.where(s==i)
        print("第{}个簇为：".format(i))
        print((D[:,index])[:,0])
        draw((D[:,index])[:,0],i)
def dist(x,y):     #计算两个坐标之间的距离，返回结果保留两位小数
    m=len(x)
    dist=(sum((x-y)**m))**(1.0/m)
    return round(dist,2)
def means(x):     #计算数据集中每个数据和前k个数据的距离，返回最小距离的下标集合
    Class=[]
    ls=[]
    for i in range(n):
        for j in range(k):
            dist1=dist(D[:,i],x[:,j])   
            ls.append(dist1)      #计算数据集第i个数据与抽取的k个数据的距离并放在ls集合中，共k个数据
        a=ls.index(min(ls))+1     #得到ls集合中距离最小的位置，并根据下表划分为k个类
        Class.append(a)           #把结果放在Class集合
        ls=[]                     #清空ls集合，继续循环下一次，直至遍历完所有数据集
    return Class                  #返回结果，结果为数据的分类结果
def avge(s):            #根据means(x)方法中返回的分类结果计算均值，选取新的簇中心点
    s=np.array(s)
    a=set(s)
    a=list(a)
    allavg=np.array([[],[]])
    for i in a:         #遍历次数为分的簇的个数
        index=np.where(s==i)     #得到第i个簇的数据的位置
        l=len(index[0])
        g=(D[:,index].sum(axis=1)).sum(axis=1)/l    #计算第i个簇所有数据的行的和
        allavg=np.hstack((allavg,g.reshape(-1,1)))  #用计算的数据和比上簇中数据个数即为最新簇中心点
    return allavg    #返回结果
def main(x):   #主方法
    p=means(x)  #得到分类结果
    q=avge(p)   #由分类结果计算新的簇中心点
    if p==means(q):  #将上一次分类结果和由新的簇中心点计算得到的分类比较，如果相同，输出结果并返回
        answer(p)
        return 
    else:       #如果结果不同，继续运行main(x)函数，直至结果相同
        main(q)
main(D)
plt.show()     #绘制出分完类的坐标图