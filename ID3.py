import numpy as np
D=np.array([[1,1,1,1,1],
           [1,1,1,2,1],
           [2,1,1,1,2],
           [3,2,1,1,2],
           [3,3,2,2,1],
           [2,3,2,2,2],
           [1,2,1,1,1],
           [1,3,2,1,2],
           [3,2,2,1,2],
           [1,2,2,2,2],
           [2,2,1,2,2],
           [2,1,2,1,2],
           [3,2,1,2,1]])
def abc(D,s):
    m,n=D.shape
    a=set(D[:,s-1])
    a=list(a)
    ls=[]
    sup=0
    for i in a:
        for j in range(m):
            if i==D[j,s-1]:
                sup=sup+1
        ls.append(sup)
        sup=0
    ls=np.array(ls)
    return ls
def abd(D,s):
    m,n=D.shape
    class_=set(D[:,n-1])
    class_=list(class_)
    class_=np.array(class_) 
    sup=0
    ls=[]
    for i in class_:
        for j in s:
            if i==D[j,n-1]:
                sup=sup+1
        ls.append(sup)
        sup=0
    return ls
def abe(D,k):
    m,n=D.shape
    class_=set(D[:,n-1])
    class_=list(class_)
    class_=np.array(class_) 
    a=set(D[:,k-1])
    a=list(a)
    d=np.zeros((len(class_),len(a)),dtype=int)
    ls=[]
    c=[]
    for i in a:
        for j in range(len(D)):
            if i==D[j,k-1]:
                ls.append(j)
        b=np.array(D[ls,n-1])
        c=c+abd(D,ls)
        ls=[]
    p=0
    for m in range(len(a)):
        for n in range(len(class_)):
            d[n][m]=c[p]
            p=p+1
    return d
def entropy(s):
    ind=np.where(s!=0)
    s=s[ind]
    s=s/sum(s)
    return -sum(s*np.log2(s))
def entrop(a,b):
    s=0
    a=a/sum(a)
    for i in range(len(a)):
        a1=np.array(b[:,i])
        s=s+a[i]*entropy(a1)
    return s
def delt(D,index,s):
    m,n=D.shape
    ls1=[]
    for j1 in range(m):
        if s!=D[j1,index]:
            ls1.append(j1)
    D=np.delete(D,ls1,axis=0)
    D=np.delete(D,index,axis=1)
    print(D)
    ls1=[]
    if len(set(D[:,-1]))==1:
        print("遍历结束")
        return D,None
    return D,main(D)
def main(D):
   # for i in range(n-1):
        m,n=D.shape
        c=abc(D,n)
        print("对元组进行分类：{}".format(c))
        d=entropy(c)
        print("元组分类的期望信息：{:.3f}".format(d))
        ls=[]
        for i in range(1,n):
            l=abc(D,i)
            k=abe(D,i)
            
            g=d-entrop(l,k)
            ls.append(g)
        index=ls.index(max(ls))
        print("第{}列在属性中具有最高的信息增益，值为：{:.3f}".format(index+1,max(ls)))
        return index
def main1(D,index):
    l1=set(D[:,index])
    l1=list(l1)
    a=index+1
    for i in l1:
        print("属性{}的取值为{}时".format(a,i))
        
        h,j=delt(D,index,i)
        if(j!=None):
            main1(h,j)
m=main(D)
main1(D,m)
