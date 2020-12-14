import numpy as np
D=np.array([[1,1,0,0,0],
            [0,1,0,1,0],
            [1,1,1,0,1],
            [1,1,0,1,0],
            [1,0,1,0,1]])
def fact(n):
    if n==1:
        return 1
    return n+fact(n-1)
def Apriori(D,min_sup,min_conf):
    n,m=D.shape
    minsup_cot=min_sup*n
    print('事务集为:')
    print(D)
    print('最小支持度计数:')
    print(minsup_cot)
    sup_cot=0
    list=[]
    ls=[]
    c1=np.eye(5)
    print('候选1项集:')
    print(c1)
    for i in range(0,m):
        for j in range(0,n):
            if D[j][i]>0:
                sup_cot=sup_cot+1
        if sup_cot<minsup_cot:
            list.append(i)
        else:
            ls.append(sup_cot)
        sup_cot=0
    l1=np.delete(c1,list,axis=0)
    print('频繁1项集:')
    print(l1)
    print(ls)
    l,k=l1.shape
    a1=fact(l-1)
    c2=np.zeros([a1,k])
    a2=0
    for a in range(0,l-1):
        for b in range(a+1,k):
            c2[a2,:]=c1[a,:]+c1[b,:]
            a2=a2+1
    print('候选2项集:')
    print(c2)
    o,p=c2.shape
    sum1=0
    sum2=0
    list1=[]
    ls1=[]
    for i1 in range(0,o):
        for i3 in range(0,n):
            m1=c2[i1,:]
            m2=D[i3,:]
            if m1.all()>=0 and m2.all()>=0:
                m3=m2-m1
                if np.all(m3>=0):
                    sum1=sum1+1
        if sum1<minsup_cot:
            list1.append(i1)
        else:
            ls1.append(sum1)
        sum1=0
    l2=np.delete(c2,list1,axis=0)
    print('频繁2项集:')
    print(l2)
    print(ls1)
    a,b=l2.shape
    a3=fact(a-1)
    c3=np.zeros([a3,b])
    a4=0
    list2=[]
    ls2=[]
    for b1 in range(0,a-1):
        for b2 in range(b1+1,a):
            c3[a4,:]=l2[b1,:]+l2[b2,:]
            a4=a4+1
    c3[c3>1]=1
    c3=np.unique(c3,axis=0)
    for b3 in range(0,len(c3)):
        if sum(c3[b3,:])>3:
            list2.append(b3)
    c3=np.delete(c3,list2,axis=0)
    print('候选3项集:')
    print(c3)
    sum3=0
    list3=[]
    for i2 in range(0,len(c3)):
        for i4 in range(0,n):
            m4=c3[i2,:]
            m5=D[i4,:]
            if m4.all()>=0 and m5.all()>=0:
               m6=m5-m4
               if np.all(m6>=0):
                   sum3=sum3+1
        if sum3<minsup_cot:
            list3.append(i2)
        else:
            ls2.append(sum3)
        sum3=0
    l3=np.delete(c3,list3,axis=0)
    print('频繁3项集:')
    print(l3)
    print(ls2)
    ls3=[]
    ls4=[]
    m1=0
    m2=0
    print("强关联规则：")
    for i in range(len(l3)):
        for j in range(len(l2)):
            for k in range(len(l1)):
                if (l3[i,:]==l1[k,:]+l2[j,:]).all():
                    m1=ls[k]
                    m2=ls1[j]
                    if ls2[i]/m1>=min_conf:
                         print("{}-->{}：{}".format(l1[k,:],l2[j,:],ls2[i]/m1))
                    if ls2[i]/m2>=min_conf:
                         print("{}-->{}：{}".format(l2[j,:],l1[k,:],ls2[i]/m2))
Apriori(D,0.2,0.6)
